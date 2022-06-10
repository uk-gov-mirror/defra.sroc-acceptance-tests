import { Then, And } from 'cypress-cucumber-preprocessor/steps'

import * as path from 'path'

import ExportDataPage from '../../../pages/export_data_page'
import TransactionsPage from '../../../pages/transactions_page'

import { parseFileDataHelper } from '../../../support/helpers'

And('I proceed to view the file download details', () => {
  TransactionsPage.transactionsMenu.getOption('Download Transaction Data', 'pas').click()
})

Then('I can view the Data Protection Notice', () => {
  ExportDataPage.dataProtectionNotice().should('be.visible')
})

Then('I am told that the transaction data file has not yet been generated', () => {
  ExportDataPage.notGeneratedAlert().should('contain.text', 'The transaction data file has not yet been generated.')
})

And('I cannot download transaction data', () => {
  ExportDataPage.downloadButton().should('not.exist')
})

And('return to the home page', () => {
  TransactionsPage.visit()
})

And('I run the generate data job', () => {
  cy.runJob('data', false)
})

Then('I can download transaction data file', () => {
  ExportDataPage.downloadButton().should('have.attr', 'href', '/regimes/pas/data_export/download')
})

And('the transaction data file exists', () => {
  cy.get('@regime').then((regime) => {
    // You don't need to worry if a file already exists in `cypress/downloads`. The `cy.downloadFile()` overwrites it
    // automatically.
    const filename = `${regime.slug}_transactions.csv.gz`
    cy.downloadFile(`${Cypress.config().baseUrl}/regimes/${regime.slug}/data_export/download`, path.join('cypress', 'downloads'), filename)

    const readFilename = filename
    const writeFilename = `${regime.slug}_transactions.csv`
    cy.task('unzip', { readFilename, writeFilename }).then((unzippedFile) => {
      cy.wrap(unzippedFile).as('unzippedFile')
    })
  })
})

And('it contains the data I expect', () => {
  cy.get('@regime').then((regime) => {
    cy.get('@unzippedFile').then((unzippedFile) => {
      cy.readFile(unzippedFile).then((data) => {
        const exportData = parseFileDataHelper(data)

        expect(exportData.length).to.equal(14)

        // The rest of the test is about confirming that all the lines in the file are for the selected regime. We do
        // this by taking the first 3 chars of each line's transaction reference and then working out all the unqiue
        // values. If everything is as expected we should get an array of one, for example ['pas']

        exportData.shift() // get rid of the headers
        exportData.pop() // get rid of the newline at the end of the file

        // We use map() to take the reference from each row and extract the first 3 chars. The result is an array, for
        // example ['pas', 'pas', 'pas']
        const referenceRegimePrefixes = exportData.map((row) => row[3].slice(0, 3).toLowerCase())
        // Set() is an ES6 native object to store unique values. We create one using our reference prefixes as the
        // source and then use the spread operator to convert it back into an array. The result should be, for example
        // ['pas']
        const uniqueReferenceRegimePrefixes = [...new Set(referenceRegimePrefixes)]

        expect(uniqueReferenceRegimePrefixes.length).to.equal(1)
        expect(uniqueReferenceRegimePrefixes[0]).to.equal(regime.slug)
      })
    })
  })
})
