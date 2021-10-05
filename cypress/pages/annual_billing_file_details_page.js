class AnnualBillingFileDetailsPage {
  static mainHeading () {
    return cy.get('h1')
  }

  static errorsHeading () {
    return cy.get('h2')
  }

  static fileDetailsPanel () {
    return cy.get('.panel')
  }

  static backBtn () {
    return cy.get('.btn.btn-secondary')
  }
}

export default AnnualBillingFileDetailsPage
