import BasePage from './base_page'

class ForgotPasswordPage extends BasePage {
  static confirm () {
    cy.get('h1').should('contain', 'Forgot your password?')
    cy.url().should('include', '/auth/password/new')
  }

  // Elements

  static emailInput () {
    return cy.get('input#user_email')
  }
}

export default ForgotPasswordPage
