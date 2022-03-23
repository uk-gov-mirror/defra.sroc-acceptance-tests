class SignInPage {
  static visit () {
    cy.visit('/auth/sign_in')
  }

  static mainHeading () {
    return cy.get('h1')
  }

  static email () {
    return cy.get('#user_email')
  }

  static password () {
    return cy.get('#user_password')
  }

  static logIn () {
    return cy.get('[name=commit]')
  }

  static forgotPasswordLink () {
    return cy.get('a[href="/auth/password/new"]')
  }

  static resendUnlockLink () {
    return cy.get('a[href="/auth/unlock/new"]')
  }
}

export default SignInPage
