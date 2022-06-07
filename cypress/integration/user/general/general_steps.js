import { Before, And, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { generateUserHelper } from '../../../support/helpers'

import LastEmailPage from '../../../pages/last_email_page'
import AcceptInvitePage from '../../../pages/accept_invite_page'
import TransactionsPage from '../../../pages/transactions_page'
import UsersPage from '../../../pages/users_page'
import AddUserPage from '../../../pages/add_user_page'

Before(() => {
  cy.intercept('GET', '**/users?search=*').as('getSearch')
})

And('I select a user', () => {
  const user = generateUserHelper()
  cy.wrap(user).as('user')

  TransactionsPage.adminMenu.getOption('User Management', '').click()

  UsersPage.addUserAccountButton().click()

  cy.get('@user').then((user) => {
    AddUserPage.emailInput().type(user.email)
    AddUserPage.firstNameInput().type(user.firstName)
    AddUserPage.lastNameInput().type(user.lastName)

    AddUserPage.regimeAccessCheckbox('Waste').click()
    AddUserPage.submitButton().click()
  })
  cy.alertShouldContain('User account created')
})

When('I update the users first name', () => {
  TransactionsPage.adminMenu.getOption('User Management', '').click()

  cy.get('@user').then((user) => {
    UsersPage.searchNameInput().type(user.lastName)
    UsersPage.submitButton().click()
    cy.wait('@getSearch').its('response.statusCode').should('eq', 200)

    UsersPage.searchResultsTable().each((element, index) => {
      cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1}) td`).eq(2).invoke('text').then((email) => {
        if (email === user.email) {
          cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1})`).invoke('attr', 'id').then((id) => {
            UsersPage.searchResultEditButton(id).click()
            cy.wait(500)

            const updatedUser = generateUserHelper()
            cy.wrap(updatedUser).as('updatedUser')

            cy.get('@updatedUser').then((updatedUser) => {
              AddUserPage.firstNameInput().type(updatedUser.firstName)
              AddUserPage.submitButton().click()
            })
          })
        }
      })
    })
  })
})

Then('I will see confirmation the user account is updated', () => {
  cy.alertShouldContain('User account updated')
})

And('I can confirm the users first name is updated', () => {
  cy.get('@user').then((user) => {
    cy.get('@updatedUser').then((updatedUser) => {
      UsersPage.searchNameInput().type(updatedUser.firstName)
      UsersPage.submitButton().click()
      cy.wait('@getSearch').its('response.statusCode').should('eq', 200)

      UsersPage.searchResultsTable().each((element, index) => {
        cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1}) td`).eq(2).invoke('text').then((email) => {
          if (email === user.email) {
            cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1})`).invoke('attr', 'id').then((id) => {
              cy.wait(500)

              cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1}) > td`).contains(user.firstName + updatedUser.firstName)
            })
          }
        })
      })
    })
  })
})

When('I update the users last name', () => {
  TransactionsPage.adminMenu.getOption('User Management', '').click()

  cy.get('@user').then((user) => {
    UsersPage.searchNameInput().type(user.lastName)
    UsersPage.submitButton().click()
    cy.wait('@getSearch').its('response.statusCode').should('eq', 200)

    UsersPage.searchResultsTable().each((element, index) => {
      cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1}) td`).eq(2).invoke('text').then((email) => {
        if (email === user.email) {
          cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1})`).invoke('attr', 'id').then((id) => {
            UsersPage.searchResultEditButton(id).click()
            cy.wait(500)

            const updatedUser = generateUserHelper()
            cy.wrap(updatedUser).as('updatedUser')

            cy.get('@updatedUser').then((updatedUser) => {
              AddUserPage.lastNameInput().type(updatedUser.lastName)
              AddUserPage.submitButton().click()
            })
          })
        }
      })
    })
  })
})

And('I can confirm the users last name is updated', () => {
  cy.get('@user').then((user) => {
    cy.get('@updatedUser').then((updatedUser) => {
      UsersPage.searchNameInput().type(user.lastName + updatedUser.lastName)
      UsersPage.submitButton().click()
      cy.wait('@getSearch').its('response.statusCode').should('eq', 200)

      UsersPage.searchResultsTable().each((element, index) => {
        cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1}) td`).eq(2).invoke('text').then((email) => {
          if (email === user.email) {
            cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1})`).invoke('attr', 'id').then((id) => {
              cy.wait(500)

              cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1}) > td`).contains(user.lastName + updatedUser.lastName)
            })
          }
        })
      })
    })
  })
})

When('I update the users regime access to {string}', (regime) => {
  TransactionsPage.adminMenu.getOption('User Management', '').click()

  cy.get('@user').then((user) => {
    UsersPage.searchNameInput().type(user.lastName)
    UsersPage.submitButton().click()
    cy.wait('@getSearch').its('response.statusCode').should('eq', 200)

    UsersPage.searchResultsTable().each((element, index) => {
      cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1}) td`).eq(2).invoke('text').then((email) => {
        if (email === user.email) {
          cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1})`).invoke('attr', 'id').then((id) => {
            UsersPage.searchResultEditButton(id).click()
            cy.wait(500)

            AddUserPage.regimeAccessCheckbox('Waste').click()
            AddUserPage.regimeAccessCheckbox(regime).click()
            AddUserPage.submitButton().click()
          })
        }
      })
    })
  })
})

And('I can confirm the users regime access is updated to {string}', (regime) => {
  cy.get('@user').then((user) => {
    cy.signOut()

    LastEmailPage.lastEmail([user.email, 'created an account'])
    cy.get('@lastEmail').then((lastEmail) => {
      const link = LastEmailPage.extractInvitationLink(lastEmail.last_email.body)

      cy.visit(link).then(() => {
        AcceptInvitePage.confirm()

        AcceptInvitePage.passwordInput().type(Cypress.env('PASSWORD'), { log: false })
        AcceptInvitePage.passwordConfirmationInput().type(Cypress.env('PASSWORD'), { log: false })
        AcceptInvitePage.submitButton().click()

        cy.get('@user').then((user) => {
          const username = `${user.firstName} ${user.lastName}`
          TransactionsPage.userMenu.menuLink().should('contain', username)

          cy.get('.navbar-text').contains(regime)
        })
      })
    })
  })
})
