import { And, When, Then, But } from 'cypress-cucumber-preprocessor/steps'
import TransactionsPage from '../../../pages/transactions_page'

When('I see the transactions page', () => {
  TransactionsPage.confirm()
})

Then('I should see the admin menu', () => {
  TransactionsPage.adminMenu.menuLink().should('be.visible')
})

But('I should not see the admin menu', () => {
  TransactionsPage.adminMenu.menuLink().should('not.exist')
})

Then('I should see the billing menu', () => {
  TransactionsPage.annualBillingMenu.menuLink().should('be.visible')
})

But('I should not see the billing menu', () => {
  TransactionsPage.annualBillingMenu.menuLink().should('not.exist')
})

Then('I should see the transactions menu', () => {
  TransactionsPage.transactionsMenu.menuLink().should('be.visible')
})

And('I should see download transactions', () => {
  TransactionsPage.downloadTransactionDataMenuItem().should('not.be.null')
})

But('I should not see download transactions', () => {
  TransactionsPage.downloadTransactionDataMenuItem().should('not.exist')
})

Then('I should only see the {string} regime', (regime) => {
  cy.get('.navbar-text').contains(regime, { matchCase: false })
  TransactionsPage.regimeMenu.menuLink().should('not.exist')
})
