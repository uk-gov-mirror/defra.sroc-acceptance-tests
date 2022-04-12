import BaseAppPage from './base_app_page'

class RetrospectiveTransactionsPage extends BaseAppPage {
  static confirm () {
    cy.get('h1').should('contain', 'Pre-April 2018 Transactions to be billed')
    cy.url().should('match', /regimes\/[a-z]{3}\/retrospectives/)
  }
}

export default RetrospectiveTransactionsPage
