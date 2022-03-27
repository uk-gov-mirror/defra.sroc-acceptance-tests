class BasePage {
  static confirm () {
    throw new Error("Extending class must implement 'confirm()'")
  }

  // Elements

  static appVersion () {
    return cy.get('.app-version')
  }

  static mainHeading () {
    return cy.get('h1')
  }

  static submitButton () {
    return cy.get('input[name="commit"]')
  }
}

export default BasePage
