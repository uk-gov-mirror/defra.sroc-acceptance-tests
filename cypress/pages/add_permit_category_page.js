import BaseAppPage from './base_app_page'

class AddPermitCategoryPage extends BaseAppPage {
  static confirm () {
    cy.get('h1').should('contain', 'New Permit Category')
    cy.url().should('match', /regimes\/[a-z]{3}\/permit_categories\/new/)
  }

  // Elements

  static cancelButton () {
    return cy.get('a.btn-secondary')
  }

  static codeInput () {
    return cy.get('input#permit_category_code')
  }

  static descriptionInput () {
    return cy.get('textarea#permit_category_description')
  }
}

export default AddPermitCategoryPage
