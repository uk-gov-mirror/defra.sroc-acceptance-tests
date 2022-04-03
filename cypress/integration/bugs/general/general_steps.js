import { Before, And, But, Then, When } from 'cypress-cucumber-preprocessor/steps'

import SignInPage from '../../../pages/sign_in_page'
import TransactionsPage from '../../../pages/transactions_page'

Before(() => {
  cy.intercept('GET', '**/regimes/*/*?search=*').as('getSearch')
  cy.intercept('GET', '**/regimes/*/retrospective_summary?**').as('getRetrospectiveSummary')
})

When('I sign in as the {word} user', (regime) => {
  SignInPage.visit()
  SignInPage.emailInput().type(Cypress.config().users[regime].email)
  SignInPage.passwordInput().type(Cypress.env('PASSWORD'))

  SignInPage.submitButton().click()
})

Then('I will be on the Transactions to be billed page', () => {
  TransactionsPage.confirm()
})

And('I search for permit reference {word}', (reference) => {
  TransactionsPage.searchInput().type(reference)
  TransactionsPage.submitButton().click()

  cy.wait('@getSearch').its('response.statusCode').should('eq', 200)
})

And('I see results', () => {
  TransactionsPage.table.rows().should('have.length.greaterThan', 1)
})

Then('I select {string} from the transactions menu', (optionText) => {
  TransactionsPage.transactionsMenu.getOption(optionText, 'pas').click()
})

And('I do not see results', () => {
  TransactionsPage.table.rows().should('have.length', 1)
})

But('if I clear the search field and search again', () => {
  TransactionsPage.searchInput().clear()
  TransactionsPage.submitButton().click()
})

And('I set pre post-sroc to {word}', (option) => {
  cy.get('select#prepost').select(option)

  cy.wait('@getSearch').its('response.statusCode').should('eq', 200)
})

When('I view the generate pre-sroc transaction file summary', () => {
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

  cy.wait(500)
})

Then('it will not let me generate the file', () => {
  cy.get('dl.transaction-summary > dd:nth-child(14)').should('contain.text', '£0.00')
  cy.get('input[value="Generate Pre-SRoC File"]').invoke('attr', 'disabled').should('eq', 'disabled')
})
