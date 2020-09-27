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
}

export default TransactionsPage
