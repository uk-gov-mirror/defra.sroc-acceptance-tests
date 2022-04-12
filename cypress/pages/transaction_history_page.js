import BaseAppPage from './base_app_page'

class TransactionHistoryPage extends BaseAppPage {
  static confirm () {
    cy.get('h1').should('contain', 'Transaction History')
    cy.url().should('match', /regimes\/[a-z]{3}\/history/)
  }
}

export default TransactionHistoryPage
