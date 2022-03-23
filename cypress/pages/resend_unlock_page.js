class ResendUnlockPage {
  static confirm () {
    cy.get('h1').should('contain', 'Resend unlock instructions')
    cy.url().should('include', '/auth/unlock')
  }

  static mainHeading () {
    return cy.get('h1')
  }

  static email () {
    return cy.get('#user_email')
  }

  static resendUnlockInstructions () {
    return cy.get('[name=commit]')
  }
}

export default ResendUnlockPage
