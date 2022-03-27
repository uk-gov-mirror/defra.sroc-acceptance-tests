import { Then, And } from 'cypress-cucumber-preprocessor/steps'
import ExportDataPage from '../../pages/export_data_page'
import TransactionsPage from '../../pages/transactions_page'

And('I proceed to view file download details', () => {
  TransactionsPage.transactionsMenu.getOption('Download Transaction Data').click()
})

Then('I can view the Data Protection Notice', () => {
  ExportDataPage.dataProtectionNotice().should('be.visible')
})

And('I can download transaction data', () => {
  ExportDataPage.downloadButton().should('have.attr', 'href', '/regimes/pas/data_export/download')
})
