import BaseAppPage from './base_app_page'

class TransactionFileHistoryPage extends BaseAppPage {
  static confirm () {
    cy.get('h1').should('contain', 'Transaction File History')
    cy.url().should('match', /regimes\/[a-z]{3}\/transaction_files/)
  }
}

export default TransactionFileHistoryPage
