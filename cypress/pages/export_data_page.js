import BaseAppPage from './base_app_page'

class ExportDataPage extends BaseAppPage {
  static confirm () {
    cy.get('h1').should('contain', 'Download Transaction Data')
    cy.url().should('include', '/data_export')
  }

  // Elements

  static dataProtectionNotice () {
    return cy.get('h5')
  }

  static downloadButton () {
    return cy.get('.btn.btn-primary')
  }
}

export default ExportDataPage
