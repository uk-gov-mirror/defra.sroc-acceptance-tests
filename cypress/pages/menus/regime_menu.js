class RegimeMenu {
  static get options () {
    return {
      Installations: '[href="/regimes/pas/transactions"]',
      Waste: '[href="/regimes/pas/transactions"]',
      'Water Quality': '[href="/regimes/cfd/transactions"]'
    }
  }

  static get selector () {
    return '[aria-labelledby="navbarRegimeSelectorLink"]'
  }

  static menuLink () {
    return cy.get('#navbarRegimeSelectorLink')
  }

  static getOption (optionText) {
    this.menuLink().click()

    return cy.get(`${this.selector} > ${this.options[optionText]}`)
  }
}

export default RegimeMenu
