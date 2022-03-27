import BasePage from './base_page'

class ResendUnlockPage extends BasePage {
  static confirm () {
    cy.get('h1').should('contain', 'Resend unlock instructions')
    cy.url().should('include', '/auth/unlock')
  }

  // Elements

  static emailInput () {
    return cy.get('#user_email')
  }
}

export default ResendUnlockPage
