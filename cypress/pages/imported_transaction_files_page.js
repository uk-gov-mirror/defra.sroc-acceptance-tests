import BaseAppPage from './base_app_page'

class ImportedTransactionFilesPage extends BaseAppPage {
  static confirm () {
    cy.get('h1').should('contain', 'Imported Transaction Files')
    cy.url().should('match', /regimes\/[a-z]{3}\/imported_transaction_files/)
  }
}

export default ImportedTransactionFilesPage
