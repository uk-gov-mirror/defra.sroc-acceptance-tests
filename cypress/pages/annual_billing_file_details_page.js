import BaseAppPage from './base_app_page'

class AnnualBillingFileDetailsPage extends BaseAppPage {
  static confirm () {
    cy.get('h1').should('contain', 'Annual Billing Data File Details')
    cy.url().should('include', '/annual_billing_data_files')
  }

  // Elements

  static errorsHeading () {
    return cy.get('h2')
  }

  static fileDetailsPanel () {
    return cy.get('.panel')
  }

  static backButton () {
    return cy.get('.btn.btn-secondary')
  }
}

export default AnnualBillingFileDetailsPage
