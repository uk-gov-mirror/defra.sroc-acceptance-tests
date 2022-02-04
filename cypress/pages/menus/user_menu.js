class UserMenu {
  static get options () {
    return {
      'Change Password': '[href="/change_password/edit"]',
      'Sign out': '[href="/auth/sign_out"]'
    }
  }

  static get selector () {
    return '[aria-labelledby="navbarUserMenuLink"]'
  }

  static menuLink () {
    return cy.get('#navbarUserMenuLink')
  }

  static getOption (optionText) {
    this.menuLink().click()

    return cy.get(`${this.selector} > ${this.options[optionText]}`)
  }
}

export default UserMenu
