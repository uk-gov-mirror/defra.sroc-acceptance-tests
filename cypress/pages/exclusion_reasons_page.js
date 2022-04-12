import BaseAppPage from './base_app_page'

class ExclusionReasonsPage extends BaseAppPage {
  static confirm () {
    cy.get('h1').should('contain', 'Exclusion Reasons')
    cy.url().should('match', /regimes\/[a-z]{3}\/exclusion_reasons/)
  }
}

export default ExclusionReasonsPage
