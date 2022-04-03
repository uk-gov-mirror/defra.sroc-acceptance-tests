import { And, Then, When } from 'cypress-cucumber-preprocessor/steps'

import TransactionDetailPage from '../../../pages/transaction_detail_page'
import TransactionsPage from '../../../pages/transactions_page'

When('I exclude the first transaction', () => {
  TransactionsPage.table.showDetailsButton(0).click()

  TransactionDetailPage.confirm()
  TransactionDetailPage.excludeFromBillingButton().click()
  TransactionDetailPage.excludeTransactionButton().click()
})

Then('I see confirmation the transaction has been updated', () => {
  cy.alertShouldContain(
    'Transaction was successfully updated.'
  )
})

And('I see the transaction struck through in transactions to be billed', () => {
  TransactionDetailPage.transactionsMenu.getOption('Transactions to be billed', 'pas').click()

  TransactionsPage.table.firstRow().should('have.class', 'excluded')
})

Then('if I reinstate the transaction', () => {
  TransactionsPage.table.showDetailsButton(0).click()

  TransactionDetailPage.reinstateForBillingButton().click()
})

And('I no longer see the transaction struck through in transactions to be billed', () => {
  TransactionDetailPage.transactionsMenu.getOption('Transactions to be billed', 'pas').click()

  TransactionsPage.table.firstRow().should('not.have.class', 'excluded')
})
