import BasePage from './base_page'

class AcceptInvitePage extends BasePage {
  static confirm () {
    cy.get('h1').should('contain', 'Set a password')
    cy.url().should('include', '/auth/invitation/accept')
  }

  // Elements

  static passwordInput () {
    return cy.get('input#user_password')
  }

  static passwordConfirmationInput () {
    return cy.get('input#user_password_confirmation')
  }
}

export default AcceptInvitePage
