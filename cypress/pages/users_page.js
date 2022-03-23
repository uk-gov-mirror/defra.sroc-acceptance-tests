class UsersPage {
  static mainHeading () {
    return cy.get('h1')
  }

  static addUserAccount () {
    return cy.get('button#new-user')
  }

  static searchName () {
    return cy.get('input#search[type="search"]')
  }

  static searchResults () {
    return cy.get('table.table-responsive > tbody > tr')
  }

  static searchResultEdit (id) {
    return cy.get(`a.btn-success[href="/users/${id}/edit"]`)
  }

  static search () {
    return cy.get('[name=commit]')
  }
}

export default UsersPage
