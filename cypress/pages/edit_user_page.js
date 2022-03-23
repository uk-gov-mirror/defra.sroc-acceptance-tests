class AddUserPage {
  static mainHeading () {
    return cy.get('h1')
  }

  static firstName () {
    return cy.get('input#user_first_name')
  }

  static lastName () {
    return cy.get('input#user_last_name')
  }

  static enabled () {
    return cy.get('input#user_enabled')
  }

  static role (option) {
    const options = {
      'Read-only User': 'input#role_read_only',
      'Read-only + Export': 'input#role_read_only_export',
      'Billing Admin': 'role_billing',
      'System Admin': 'role_admin'
    }

    return cy.get(options[option])
  }

  static regimeAccess (option) {
    const options = {
      Installations: 'input#user_regime_users_attributes_0_enabled',
      Waste: 'input#user_regime_users_attributes_1_enabled',
      'Water Quality': 'input#user_regime_users_attributes_2_enabled'
    }

    return cy.get(options[option])
  }

  static updateUser () {
    return cy.get('input[name="commit"]')
  }

  static resendInvite () {
    return cy.get('a.btn-warning')
  }

  static cancel () {
    return cy.get('a.btn-secondary')
  }
}

export default AddUserPage
