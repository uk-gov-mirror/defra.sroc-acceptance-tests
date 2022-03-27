import BaseAppPage from './base_app_page'

class AnnualBillingPage extends BaseAppPage {
  static confirm () {
    cy.get('h1').should('contain', 'Annual Billing Data Files')
    cy.url().should('include', '/annual_billing_data_files')
  }

  // Elements

  static dataFilesTable () {
    return cy.get('.table')
  }

  static fileNameLink () {
    return cy.get('.table > tbody > tr:nth-child(1) > td:nth-child(1)')
  }
}

export default AnnualBillingPage
