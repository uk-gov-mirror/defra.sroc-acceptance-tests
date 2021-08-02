import { Before, When, Then, And } from 'cypress-cucumber-preprocessor/steps'
import ExportDataPage from '../../pages/export_data_page'
import TransactionsPage from '../../pages/transactions_page'
  
When('I select the {string} regime', (regime) => {
    TransactionsPage.regimeMenu().click()
    TransactionsPage.regimeMenuItem(regime).click()
  })

And('I proceed to view file download details', () => {
    TransactionsPage.transactionMenu().click()
    TransactionsPage.downloadTransactionDataMenuItem().click()
  })

Then('I can view the Data Protection Notice', () => {
  ExportDataPage.dataProtectionNotice().should('be.visible')
  })  
  
And('I can download transaction data', () => {
  ExportDataPage.downloadBtn().should('have.attr', 'href', '/regimes/pas/data_export/download')
    //DownloadTransactionFilePage.downloadBtn().click()
  }) 