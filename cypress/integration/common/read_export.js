import { Then, When } from 'cypress-cucumber-preprocessor/steps'

When('I read the export file {string}', (filePath) => {
  cy.task('s3Download', {
    Bucket: Cypress.env('S3_BUCKET'),
    remotePath: Cypress.env('S3_DOWNLOAD_PATH'),
    filePath
  }).then(data => {
    cy.wrap(splitData(data)).as('exportData')
  })
})

Then('row {int} column {int} equals {string}', (row, column, value) => {
  cy.get('@exportData')
    .then(exportData => expect(exportData[row][column]).to.equal(value))
})

Then('column {int} contains {string}', (column, value) => {
  cy.get('@exportData')
    .then(exportData => {
      const columnData = exportData.map(row => row[column])
      expect(columnData).to.include(value)
    })
})

/**
 * Splits the data into a two-dimensional array, removing the double quotes that normally enclose each item.
 */
function splitData (data, row, column) {
  return data
    // Split the data into an array of lines
    .split('\n')
    // Split each line into an array of items, and use regex replace to remove enclosing quotes from each item.
    // https://thispointer.com/remove-first-and-last-double-quotes-from-a-string-in-javascript/
    .map(line => line
      .split(',')
      .map(item => item.replace(/(^"|"$)/g, ''))
    )
}
