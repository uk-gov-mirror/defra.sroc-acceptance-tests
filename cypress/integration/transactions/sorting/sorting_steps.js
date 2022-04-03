import { Then, When, Before } from 'cypress-cucumber-preprocessor/steps'

import { columnPickerHelper } from '../../../support/helpers'

import SignInPage from '../../../pages/sign_in_page'
import TransactionsPage from '../../../pages/transactions_page'

Before(() => {
  cy.intercept('GET', '**/regimes/*/*?search=*').as('getSearch')
})

When('I sign in as the {word} user', (regime) => {
  SignInPage.visit()
  SignInPage.emailInput().type(Cypress.config().users[regime].email)
  SignInPage.passwordInput().type(Cypress.env('PASSWORD'))

  SignInPage.submitButton().click()
})

Then('I am on the Transactions to be Billed page', () => {
  TransactionsPage.confirm()
})

When('I sort by {string} in {word} order', (column, sortOrder) => {
  cy.get('@regime').then((regime) => {
    const dataColumn = columnPickerHelper(column, regime.slug)

    const sortOrders = {
      ascending: { class: 'sorted-asc', caret: 'oi-caret-top' },
      descending: { class: 'sorted-desc', caret: 'oi-caret-bottom' }
    }

    // If a column has not been previously selected then it won't have either sort classes. We confirm whether we are
    // dealing with a sorted column first by checking for the class 'sorted'.
    cy
      .get(`a[data-column="${dataColumn.name}"]`)
      .invoke('hasClass', 'sorted')
      .then((result) => {
        // If its not sorted we click it. We can't govern what order it gets sorted in because that's governed by
        // the sort order cached to a cookie in the session. This is why we need the second step below.
        if (!result) {
          cy.get(`a[data-column="${dataColumn.name}"]`).click()
          cy.wait('@getSearch').its('response.statusCode').should('eq', 200)
        }
      })
      // Next step is sorting in the order that's been requested. We check if it's already sorted as requested and if
      // not we click it to force the sorting to match.
      .get(`a[data-column="${dataColumn.name}"]`)
      .invoke('hasClass', sortOrders[sortOrder].class)
      .then((result) => {
        if (!result) {
          cy.get(`a[data-column="${dataColumn.name}"]`).click()
          cy.wait('@getSearch').its('response.statusCode').should('eq', 200)
        }
      })
      .get(`th > [data-column="${dataColumn.name}"]`).then((element) => {
        expect(element).to.have.class('sorted')
        expect(element.find('span.oi')).to.have.class(sortOrders[sortOrder].caret)
      })
  })
})

Then('I see {string} as the first {string}', (value, column) => {
  cy.get('@regime').then((regime) => {
    const dataColumn = columnPickerHelper(column, regime.slug)

    TransactionsPage.resultsTable().find(`td:nth-child(${dataColumn.index})`).should('contain.text', value)
  })
})
