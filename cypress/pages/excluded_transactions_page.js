import BaseAppPage from './base_app_page'

class ExcludedTransactionsPage extends BaseAppPage {
  static confirm () {
    cy.get('h1').should('contain', 'Excluded Transactions')
    cy.url().should('match', /regimes\/[a-z]{3}\/exclusions/)
  }
}

export default ExcludedTransactionsPage
