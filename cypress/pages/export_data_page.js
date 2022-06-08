import BaseAppPage from './base_app_page'

class ExportDataPage extends BaseAppPage {
  static confirm () {
    cy.get('h1').should('contain', 'Download Transaction Data')
    cy.url().should('match', /regimes\/[a-z]{3}\/data_export/)
  }

  // Elements

  static dataProtectionNotice () {
    return cy.get('h5')
  }

  static downloadButton () {
    return cy.get('.btn.btn-primary')
  }

  static notGeneratedAlert () {
    return cy.get('.row > .alert')
  }
}

export default ExportDataPage
