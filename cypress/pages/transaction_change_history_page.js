import BaseAppPage from './base_app_page'
import TransactionChangeHistoryTable from './tables/transaction_change_history_table'

class TransactionChangeHistoryPage extends BaseAppPage {
  static get table () {
    return TransactionChangeHistoryTable
  }

  static confirm () {
    cy.get('h1').should('contain', 'Transaction change history')
    cy.url().should('match', /regimes\/[a-z]{3}\/transactions\/\d*\/audit/)
  }

  // Elements

  static backLink () {
    return cy.get('a.back-link')
  }

  static customerReferenceDescription () {
    return cy.get('dl.transaction-summary dd:nth-child(2)')
  }

  static markedForExclusionBadge () {
    return cy.get('dl.transaction-summary dd:nth-child(28) span.badge-danger')
  }

  static toBeBilledBadge () {
    return cy.get('dl.transaction-summary dd:nth-child(28) span.badge-primary')
  }

  static temporaryCessationDescription () {
    return cy.get('dl.transaction-summary dd:nth-child(14)')
  }
}

export default TransactionChangeHistoryPage
