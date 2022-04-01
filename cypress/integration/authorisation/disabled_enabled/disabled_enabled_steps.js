import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps'
import EditUserPage from '../../../pages/edit_user_page'
import SignInPage from '../../../pages/sign_in_page'
import TransactionsPage from '../../../pages/transactions_page'
import UsersPage from '../../../pages/users_page'

Before(() => {
  cy.intercept('GET', '**/users?search=*').as('getSearch')
})

Given('my account has been {word}', (status) => {
  cy.signIn(Cypress.config().users.admin.email)

  TransactionsPage.adminMenu.getOption('User Management', '').click()
  UsersPage.searchNameInput().type('Readonly')
  UsersPage.submitButton().click()

  cy.wait('@getSearch').its('response.statusCode').should('eq', 200)

  UsersPage.searchResultsTable().each((_element, index) => {
    cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1}) td`).eq(2).invoke('text').then((email) => {
      if (email === 'readonly@sroc.gov.uk') {
        cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1})`).invoke('attr', 'id').then((id) => {
          UsersPage.searchResultEditButton(id).click()
          if (status === 'enabled') {
            EditUserPage.enabledCheckbox().check()
          } else {
            EditUserPage.enabledCheckbox().uncheck()
          }
          EditUserPage.submitButton().click()
        })
      }
    })
  })

  cy.signOut()
})

Then('the TCM refuses me access', () => {
  SignInPage.confirm()

  cy.alertShouldContain(
    'Your account is not enabled.  Contact your administrator.'
  )
})

Then('the TCM allows me access', () => {
  TransactionsPage.confirm()

  TransactionsPage.userMenu.menuLink().should('contain', 'Readonly User')
})
