import { Then, When, Before } from 'cypress-cucumber-preprocessor/steps'

import TransactionsPage from '../../../pages/transactions_page'
import TransactionDetailPage from '../../../pages/transaction_detail_page'

Before(() => {
  // The TCM uses JavaScript and XHR requests to avoid page refreshes. So, for
  // example, we want to test that searching for a customer results in a table
  // of transactions containing only that customer. For that we have to wait for
  // the XHR request to complete and the JavaScript to kick in and update the
  // page. Only then can we check we use cypress to grab the table elements we
  // need to check.
  //
  // To do that we have to register the XHR call with Cypress and give it an
  // 'alias'. When we complete an action we know will result in a request, we
  // need to tell Cypress to wait for our aliased XHR call to complete.
  //
  // Here, we have chosen to register the XHR in a before block so we know its
  // available throughout, and to keep the tests a little cleaner.
  //
  // https://docs.cypress.io/guides/guides/network-requests.html#Waiting
  cy.intercept('GET', '**/regimes/*/transactions?search=*').as('getSearch')
})

When('I search for the customer {string}', (customer) => {
  TransactionsPage.searchInput().type(customer)
  TransactionsPage.submitButton().click()

  cy.wait('@getSearch')
})

Then('I see only results for customer {string}', (customer) => {
  TransactionsPage.table.cells('Customer', 'wml').each(($el) => {
    expect($el.text()).to.have.string(customer)
  })
})

When('I select the first transaction', () => {
  TransactionsPage.table.showDetailsButton(0).click()
})

Then('I see the detail, suggested category and related transactions sections', () => {
  TransactionDetailPage.confirm()

  cy.get('h1').should('contain', 'Transaction detail').should('be.visible')
  cy.get('h2').should('contain', 'Suggested category').should('be.visible')
  cy.get('h2').should('contain', 'Related unbilled transactions').should('be.visible')
})
