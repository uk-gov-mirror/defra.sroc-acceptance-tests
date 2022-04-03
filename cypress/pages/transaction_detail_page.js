import BaseAppPage from './base_app_page'

class TransactionDetailPage extends BaseAppPage {
  static confirm () {
    cy.get('h1').should('contain', 'Transaction detail')
    cy.url().should('match', /regimes\/[a-z]{3}\/transactions\/\d*/)
  }

  // Elements

  static excludeFromBillingButton () {
    return cy.get('button.exclude-button')
  }

  static excludeTransactionButton () {
    return cy.get('input[type="submit"][data-disable-with="Exclude Transaction"]')
  }

  static reinstateForBillingButton () {
    return cy.get('input[type="submit"][data-disable-with="Reinstate for Billing"]')
  }

  static viewChangeHistoryButton () {
    return cy.get('a.btn-outline-info')
  }
}

export default TransactionDetailPage
