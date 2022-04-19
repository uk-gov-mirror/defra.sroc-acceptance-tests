import BaseAppPage from './base_app_page'
import RetrospectiveTransactionsToBeBilledTable from './tables/retrospective_transactions_to_be_billed_table'

class RetrospectiveTransactionsPage extends BaseAppPage {
  static get table () {
    return RetrospectiveTransactionsToBeBilledTable
  }

  static confirm () {
    cy.get('h1').should('contain', 'Pre-April 2018 Transactions to be billed')
    cy.url().should('match', /regimes\/[a-z]{3}\/retrospectives/)
  }

  // Elements

  static generatePreSrocFileButton () {
    return cy.get('button.generate-transaction-file-btn')
  }
}

export default RetrospectiveTransactionsPage
