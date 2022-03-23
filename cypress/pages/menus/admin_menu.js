class AdminMenu {
  static options (regimeSlug) {
    return {
      'Permit Categories': `[href="/regimes/${regimeSlug}/permit_categories"]`,
      'Exclusion Reasons': `[href="/regimes/${regimeSlug}/exclusion_reasons"]`,
      'User Management': '[href="/users"]'
    }
  }

  static get selector () {
    return '[aria-labelledby="navbarAdminSelectorLink"]'
  }

  static menuLink () {
    return cy.get('#navbarAdminSelectorLink')
  }

  static getOption (optionText, regimeSlug) {
    this.menuLink().click()

    return cy.get(`${this.selector} > ${this.options(regimeSlug)[optionText]}`)
  }
}

export default AdminMenu
