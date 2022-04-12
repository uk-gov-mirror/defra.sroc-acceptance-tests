import BasePage from './base_page'

class ForgotPasswordConfirmPage extends BasePage {
  static confirm () {
    cy.get('h1').should('contain', 'Change your password')
    cy.url().should('include', '/auth/password')
  }

  // Elements

  static passwordInput () {
    return cy.get('input#user_password')
  }

  static passwordConfirmationInput () {
    return cy.get('input#user_password_confirmation')
  }
}

export default ForgotPasswordConfirmPage
