import BaseAppPage from './base_app_page'

class ChangePasswordPage extends BaseAppPage {
  static confirm () {
    cy.get('h1').should('contain', 'Change your password')
    cy.url().should('include', '/change_password/edit')
  }
}

export default ChangePasswordPage
