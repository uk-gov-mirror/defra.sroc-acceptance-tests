import BaseAppPage from './base_app_page'

class TransactionsPage extends BaseAppPage {
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

  static resultsTable () {
    return cy.get('.table')
  }

  static customerColumn () {
    return cy.get('.table > tbody > tr > td:nth-child(4)')
  }
}

export default TransactionsPage
