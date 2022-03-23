class AcceptInvitePage {
  static visit (inviteLink) {
    cy.visit(inviteLink)
  }

  static mainHeading () {
    return cy.get('h2')
  }

  static password () {
    return cy.get('input#user_password')
  }

  static passwordConfirmation () {
    return cy.get('input#user_password_confirmation')
  }

  static setPassword () {
    return cy.get('input[name="commit"]')
  }
}

export default AcceptInvitePage
