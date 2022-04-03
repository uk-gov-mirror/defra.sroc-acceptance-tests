import BaseAppPage from './base_app_page'
import TransactionsToBeBilledTable from './tables/transactions_to_be_billed_table'

class TransactionsPage extends BaseAppPage {
  static get table () {
    return TransactionsToBeBilledTable
  }

  static confirm () {
    cy.get('h1').should('contain', 'Transactions to be billed')
    // As transactions is the root path when authenticated we can't guarantee we'll have a url to assert against.
    // This is why we don't have an assertion against the url like other page objects
  }

  static visit () {
    // Transactions is the root path. You just have to be authenticated to see it
    cy.visit('/')
  }

  // Elements

  static searchInput () {
    return cy.get('#search')
  }
}

export default TransactionsPage
