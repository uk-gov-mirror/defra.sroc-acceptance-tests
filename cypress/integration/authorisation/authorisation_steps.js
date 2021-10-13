import { And, When, Then, But } from 'cypress-cucumber-preprocessor/steps'
import TransactionsPage from '../../pages/transactions_page'

When('I see the transactions page', () => {
  TransactionsPage.mainHeading().contains('Transactions to be billed')
})

Then('I should see the admin menu', () => {
  TransactionsPage.adminMenu().should('be.visible')
})

But('I should not see the admin menu', () => {
  TransactionsPage.adminMenu().should('not.exist')
})

Then('I should see the billing menu', () => {
  TransactionsPage.billingMenu().should('be.visible')
})

But('I should not see the billing menu', () => {
  TransactionsPage.billingMenu().should('not.exist')
})

Then('I should see the transactions menu', () => {
  TransactionsPage.transactionMenu().should('be.visible')
})

And('I should see download transactions', () => {
  TransactionsPage.downloadTransactionDataMenuItem().should('not.be.null')
})

But('I should not see download transactions', () => {
  TransactionsPage.downloadTransactionDataMenuItem().should('not.exist')
})

Then('I should only see the {string} regime', (regime) => {
  cy.get('.navbar-text').contains(regime, { matchCase: false })
  TransactionsPage.regimeMenu().should('not.exist')
})
