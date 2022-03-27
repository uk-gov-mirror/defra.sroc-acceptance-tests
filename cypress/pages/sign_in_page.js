import BasePage from './base_page'

class SignInPage extends BasePage {
  static confirm () {
    cy.get('h1').should('contain', 'Sign in')
    cy.url().should('include', '/auth/sign_in')
  }

  static visit () {
    cy.visit('/auth/sign_in')
  }

  // Elements

  static emailInput () {
    return cy.get('#user_email')
  }

  static forgotPasswordLink () {
    return cy.get('a[href="/auth/password/new"]')
  }

  static passwordInput () {
    return cy.get('#user_password')
  }

  static resendUnlockLink () {
    return cy.get('a[href="/auth/unlock/new"]')
  }
}

export default SignInPage
