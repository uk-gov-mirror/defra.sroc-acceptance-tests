class BaseTable {
  static cell (rowNumber, columnName, regimeSlug) {
    throw new Error("Extending class must implement 'cell()'")
  }

  static firstRow () {
    return cy.get('.table-responsive > tbody > tr:first-child')
  }

  static rows () {
    return cy.get('.table-responsive > tbody > tr')
  }
}

export default BaseTable
