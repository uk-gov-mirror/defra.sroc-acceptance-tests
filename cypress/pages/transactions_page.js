class TransactionsPage {
  static visit () {
    // Transactions is the root path. You just have to be authenticated
    // to see it
    cy.visit('/')
  }

  static mainHeading () {
    return cy.get('h1')
  }

  static search () {
    return cy.get('#search')
  }

  static searchBtn () {
    return cy.get('[name=commit]')
  }

  static resultsTable () {
    return cy.get('.table')
  }

  static customerColumn () {
    return cy.get('.table > tbody > tr > td:nth-child(4)')
  }

  static transactionMenu () {
    return cy.get('#navbarTransactionsSelectorLink')
  }

  static adminMenu () {
    return cy.get('#navbarAdminSelectorLink')
  }

  static billingMenu () {
    return cy.get('#navbarAnnualBillingSelectorLink')
  }

  static regimeMenu () {
    return cy.get('#navbarRegimeSelectorLink')
  }

  static regimeMenuItem (regime) {
    let slug

    switch (regime) {
      case 'Water Quality':
        slug = 'cfd'
        break
      case 'Installations':
        slug = 'pas'
        break
      case 'Waste':
        slug = 'wml'
        break
    }

    return cy.get(`.nav-item.show > .dropdown-menu > [href="/regimes/${slug}/transactions"]`)
  }

  static downloadTransactionDataMenuItem () {
    return cy.get(':nth-child(1) > .nav-item > .dropdown-menu > [href="/regimes/pas/data_export"]')
  }

  static annualBillingDataMenuItem () {
    return cy.get('#navbarAnnualBillingSelectorLink')
  }

  static reviewAnnualBillingDataMenuItem () {
    return cy.get(':nth-child(1) > .dropdown > div > [href="/regimes/wml/annual_billing_data_files"]')
  }
}

export default TransactionsPage
