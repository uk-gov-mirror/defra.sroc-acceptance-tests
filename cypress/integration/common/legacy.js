// We disable this rule to prevent chai matchers like `to.be.empty` causing linting errors:
/* eslint-disable no-unused-expressions */

import { Then, And, Before } from 'cypress-cucumber-preprocessor/steps'

import MainMenu from '../../pages/menus/main_menu'

import RetrospectiveTransactionsPage from '../../pages/retrospective_transactions_page'
import TransactionsPage from '../../pages/transactions_page'

Before(() => {
  // When certain drop downs are selected the TCM will do a background refresh of the UI using XHR requests.
  // The impact on testing is that there are times having selected an option we need to wait for that background request
  // to complete before we then try and get() or assert anything in the UI. If we don't we may get old data or hit
  // inexplicable Cypress errors.
  //
  // The legacy tests handled this by scattering wait() calls all over the place. However, most testing frameworks
  // consider this an anti-pattern https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting. The
  // solution in Cypress is to intercept requests, register an alias for them and then when needed wait() on a
  // registered alias (XHR request) to complete. We do the intercept part in a before() hook as there are a number of
  // steps that depend on selecting dropdowns in the UI
  cy.intercept('GET', '**/regimes/*/transactions?search=*').as('getSearch')

  // This request is made when a transaction is selected from the results
  cy.intercept('GET', '**/regimes/*/transactions/*').as('getTransaction')

  // This request is made when the 'Approve' button is clicked
  cy.intercept('PUT', '**/regimes/*/transactions/approve.json').as('putApproveTransactions')

  // This request is made just before displaying the generate transaction file summary modal
  cy.intercept('GET', '**/regimes/*/transaction_summary?**').as('getTransactionSummary')

  // This request is made in transaction  history after changing the view option
  cy.intercept('GET', '**/regimes/*/retrospectives?*').as('getRetrospectivesSearch')

  // This request is made just before displaying the generate presroc transaction file summary modal
  cy.intercept('GET', '**/regimes/*/retrospective_summary?**').as('getRetrospectiveSummary')
})

Then('the user menu is visible', () => {
  MainMenu.user.menuLink().should('be.visible')
})

And('the main heading is {string}', (heading) => {
  cy.get('h1').should('contain', heading)
})

And('the user menu says I am signed in as {string}', (username) => {
  MainMenu.user.menuLink().should('contain', username)
})

And('I select {string} from the Transactions menu', (optionText) => {
  cy.get('@regime').then((regime) => {
    MainMenu.transactions.getOption(optionText, regime.slug).click()
  })
})

Then('the first record has file reference {string}', (fileReference) => {
  cy.get('.table-responsive > tbody > tr:first-child > td').eq(1).invoke('text').then((reference) => {
    expect(reference.trim()).to.equal(fileReference)
  })
})

Then('I copy the consent reference from the first transaction', () => {
  cy.get('.table-responsive > tbody > tr:first-child > td').eq(4).invoke('text').then((reference) => {
    cy.wrap(reference.trim()).as('searchValue')
  })
})

And('search transactions with it', () => {
  cy.get('@searchValue').then((searchValue) => {
    cy.get('#search').type(searchValue)
    cy.get('input[value="Search"]').click()

    cy.wait('@getSearch').its('response.statusCode').should('eq', 200)
  })
})

And('all transactions displayed have the same consent reference', () => {
  // This line is here to force Cypress to wait until the search is complete. Cypress should() has an inbuilt retry
  // mechanism. We know it takes a moment for the UI to update with the results and during that time it has the Search
  // button disable. We use this information to wait until the button is enabled before then grabbing all the table rows
  cy.get('input[value="Search"]').should('not.have.attr', 'disabled')
  cy.get('@searchValue').then((searchValue) => {
    cy.get('.table-responsive > tbody > tr').each((element) => {
      expect(element.children('td:nth-child(5)').text().trim()).to.equal(searchValue)
    })
  })
})

Then('I select a category for each transaction', () => {
  // First make sure the categories are sorted in ascending order. If we don't as we select a category the TCM reorders
  // the list moving our updated record into the position of the next one we need to update. This causes the test
  // to error.
  cy.get('@regime').then((regime) => {
    const dataColumn = TransactionsPage.table.columnPicker('Category', regime.slug)

    // If the column has not been previously selected then it won't have either sort classes. We confirm whether we are
    // dealing with a sorted column first by checking for the class 'sorted'.
    cy
      .get(`a[data-column="${dataColumn.name}"]`)
      .invoke('hasClass', 'sorted')
      .then((result) => {
        // If its not sorted we click it. We can't govern what order it gets sorted in because that's governed by
        // the sort order cached to a cookie in the session. This is why we need the second step below.
        if (!result) {
          cy.get(`a[data-column="${dataColumn.name}"]`).click()
          cy.wait('@getSearch').its('response.statusCode').should('eq', 200)
        }
      })
      // Next step is sorting in the order we need. We check if it's already sorted as needed and if
      // not we click it to force the sorting to be ascending.
      .get(`a[data-column="${dataColumn.name}"]`)
      .invoke('hasClass', 'sorted-asc')
      .then((result) => {
        if (!result) {
          cy.get(`a[data-column="${dataColumn.name}"]`).click()
          cy.wait('@getSearch').its('response.statusCode').should('eq', 200)
        }
      })
      // Now we can get on with the work of selecting the category code
      .get('.table-responsive > tbody > tr input.tcm-select-input').each((element, index) => {
        cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1}) input.tcm-select-input`).type('{downarrow}')
        cy.wait(500)
        cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1}) input.tcm-select-input`).type('{enter}')
        cy.wait('@getSearch')
      })
  })
})

And('the transaction categories will be set', () => {
  cy.get('.table-responsive > tbody > tr').each((element, index) => {
    cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1}) input.tcm-select-input`).should('not.exist')
    cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1}) td`).eq(7).invoke('text').then((reference) => {
      expect(reference.trim()).not.to.be.undefined
    })
  })
})

And('the transaction charges will be set', () => {
  cy.get('@regime').then((regime) => {
    TransactionsPage.table.cells('Amount', regime.slug).first().should('not.contain.text', '(TBC)')
  })
})

Then('there are no transactions to be billed displayed anymore', () => {
  cy.get('.table-responsive > tbody > tr').should('not.exist')
})

And('approve the transactions for billing', () => {
  cy.get('button.approve-all-btn').click()

  cy.wait('@putApproveTransactions')
  cy.wait('@getSearch').its('response.statusCode').should('eq', 200)
  cy.wait(500)
})

And('generate the transaction file', () => {
  cy.get('button.generate-transaction-file-btn').click()

  cy.wait('@getTransactionSummary').its('response.statusCode').should('eq', 200)

  // NOTE: Whilst handy to confirm the dialog has appeared this is actually here to force the tests to wait for the
  // dialog until it then tries to get() elements on it
  cy.get('#summary-dialog')
    .should('have.class', 'show')
    .should('have.attr', 'aria-modal')
  cy.get('#summary-dialog').should('not.have.attr', 'aria-hidden')

  cy.get('#summary-dialog h5.modal-title')
    .should('be.visible')
    .should('contain.text', 'Generate Transaction File')

  // TODO: Understand why we need this explicit wait() here. We've confirmed that the modal dialog is open
  // and visible and that we can access the controls. But without this wait() we find more often than not the
  // dialog is not dismissed when cancel is clicked which causes an error in the tests
  cy.wait(500)

  cy.get('#summary-dialog input#confirm').check()

  cy.get('#summary-dialog input.file-generate-btn')
    .should('be.enabled')
    .click()
})

Then('I see confirmation the transaction file is queued for export', () => {
  cy.extractExportFilename().then((filename) => {
    cy.wrap(filename).as('exportFilename')
  })
})

Then('I clear the search field and search again because of CMEA-306', () => {
  TransactionsPage.searchInput().clear()
  TransactionsPage.submitButton().click()
})

And('I log the transaction filename to prove it can be used in another step', () => {
  cy.get('@exportFilename')
    .then(filename => cy.log(filename))
})

And('I grab the first record and confirm its period is pre-April 2018', () => {
  cy.get('@regime').then((regime) => {
    RetrospectiveTransactionsPage.table.cells('Period', regime.slug).first().invoke('text').then((text) => {
      const endPeriod = text.trim().slice(11)
      const parts = endPeriod.split('/')
      const year = parseInt(parts[2])
      cy.log(`Extracted period end year is ${year}`)

      expect(year).to.be.at.most(18)
    })
  })
})

Then('I generate the pre-sroc transaction file', () => {
  cy.get('button.generate-transaction-file-btn').click()

  cy.wait('@getRetrospectiveSummary').its('response.statusCode').should('eq', 200)

  // NOTE: Whilst handy to confirm the dialog has appeared this is actually here to force the tests to wait for the
  // dialog until it then tries to get() elements on it
  cy.get('#summary-dialog')
    .should('have.class', 'show')
    .should('have.attr', 'aria-modal')
  cy.get('#summary-dialog').should('not.have.attr', 'aria-hidden')

  cy.get('#summary-dialog h5.modal-title')
    .should('be.visible')
    .should('contain.text', 'Generate Pre-SRoC File')

  // TODO: Understand why we need this explicit wait() here. We've confirmed that the modal dialog is open
  // and visible and that we can access the controls. But without this wait() we find more often than not the
  // dialog is not dismissed when cancel is clicked which causes an error in the tests
  cy.wait(500)

  cy.get('#summary-dialog input#confirm').check()

  cy.get('#summary-dialog input.file-generate-btn')
    .should('be.enabled')
    .click()

  cy.wait('@getRetrospectivesSearch').its('response.statusCode').should('eq', 200)
})
