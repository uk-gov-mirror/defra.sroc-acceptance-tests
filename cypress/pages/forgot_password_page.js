class ForgotPasswordPage {
  static mainHeading () {
    return cy.get('h1')
  }

  static email () {
    return cy.get('input#user_email')
  }

  static sendMeResetPasswordInstructions () {
    return cy.get('input[name=commit]')
  }
}

export default ForgotPasswordPage
