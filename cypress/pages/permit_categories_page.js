import BaseAppPage from './base_app_page'

class PermitCategoriesPage extends BaseAppPage {
  static confirm () {
    cy.get('h1').should('contain', 'Permit Categories')
    cy.url().should('include', '/permit_categories')
  }

  // Elements

  static searchCodeInput () {
    return cy.get('input#search[type="search"]')
  }

  static addNewPermitCategoryButton () {
    return cy.get('button#new-category')
  }
}

export default PermitCategoriesPage
