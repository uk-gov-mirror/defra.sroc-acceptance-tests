import { And, Then, When } from 'cypress-cucumber-preprocessor/steps'

import TransactionChangeHistoryPage from '../../../pages/transaction_change_history_page'
import TransactionDetailPage from '../../../pages/transaction_detail_page'
import TransactionsPage from '../../../pages/transactions_page'

When('I set the temporary cessation flag for the first transaction', () => {
  TransactionsPage.table.temporaryCessationSelect(0).select('Y').should('have.value', 'true')
})

Then('exclude the first transaction', () => {
  TransactionsPage.table.showDetailsButton(0).click()

  TransactionDetailPage.confirm()
  TransactionDetailPage.excludeFromBillingButton().click()
  TransactionDetailPage.excludeTransactionButton().click()
})

When('I view the transaction change history', () => {
  TransactionDetailPage.viewChangeHistoryButton().click()

  TransactionChangeHistoryPage.confirm()
})

Then('I will see Temporary Cessation is Yes', () => {
  TransactionChangeHistoryPage.temporaryCessationDescription().should('have.text', 'Yes')
})

And('I will see it has a status of To be billed and Marked for Exclusion', () => {
  TransactionChangeHistoryPage.toBeBilledBadge().should('exist')
  TransactionChangeHistoryPage.markedForExclusionBadge().should('exist')
})

And('I will see a record of its import', () => {
  TransactionChangeHistoryPage.table.rows().should('contain.text', 'Transaction imported from file')
})

And('I will see a record of its cessation', () => {
  TransactionChangeHistoryPage.table.rows().should('contain.text', 'Temporary cessation changed from No to Yes')
})

And('I will see a record of its exclusion', () => {
  TransactionChangeHistoryPage.table.rows().should('contain.text', 'Excluded from billing status changed from included to excluded')
  TransactionChangeHistoryPage.table.rows().should('contain.text', 'Exclusion reason')
})
