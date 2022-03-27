class AnnualBillingMenu {
  static get selector () {
    return '[aria-labelledby="navbarAnnualBillingSelectorLink"]'
  }

  static options (regimeSlug) {
    return {
      'Review Annual Billing Data': `[href="/regimes/${regimeSlug}/annual_billing_data_files"]`
    }
  }

  static menuLink () {
    return cy.get('#navbarAnnualBillingSelectorLink')
  }

  static getOption (optionText, regimeSlug) {
    this.menuLink().click()

    return cy.get(`${this.selector} > ${this.options(regimeSlug)[optionText]}`)
  }
}

export default AnnualBillingMenu
