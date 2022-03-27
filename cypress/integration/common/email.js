import { And, But, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { generateUserHelper, generateStringHelper } from '../../support/helpers'

import AcceptInvitePage from '../../pages/accept_invite_page'
import AddUserPage from '../../pages/add_user_page'
import EditUserPage from '../../pages/edit_user_page'
import ForgotPasswordPage from '../../pages/forgot_password_page'
import LastEmailPage from '../../pages/last_email_page'
import ResendUnlockPage from '../../pages/resend_unlock_page'
import SignInPage from '../../pages/sign_in_page'
import TransactionsPage from '../../pages/transactions_page'
import UsersPage from '../../pages/users_page'

Given('I am a new user', () => {
  const user = generateUserHelper()

  cy.wrap(user).as('user')
})

Given('I am an existing user', () => {
  cy.authenticate(Cypress.config().users.admin.email)

  const user = generateUserHelper()
  cy.wrap(user, { log: false }).as('user')

  cy.get('@user', { log: false }).then((user) => {
    cy.addUser(user)
    cy.signOut()
  })
})

When('a new account is created for me', () => {
  cy.signIn(Cypress.config().users.admin.email)

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

And('I accept the invitation', () => {
  cy.signOut()

  cy.get('@user').then((user) => {
    LastEmailPage.lastEmail([user.email, 'created an account'])

    cy.get('@lastEmail').then((lastEmail) => {
      const link = LastEmailPage.extractInvitationLink(lastEmail.last_email.body)

      cy.visit(link).then(() => {
        AcceptInvitePage.confirm()

        AcceptInvitePage.passwordInput().type(Cypress.env('PASSWORD'), { log: false })
        AcceptInvitePage.passwordConfirmationInput().type(Cypress.env('PASSWORD'), { log: false })
        AcceptInvitePage.submitButton().click()
      })
    })
  })
})

Then('I will be signed in with my new account', () => {
  cy.get('@user').then((user) => {
    const username = `${user.firstName} ${user.lastName}`
    TransactionsPage.userMenu.menuLink().should('contain', username)
  })
})

And('I incorrectly enter my password 5 times', () => {
  cy.get('@user').then((user) => {
    SignInPage.emailInput().type(user.email)

    for (let i = 0; i < 5; i++) {
      SignInPage.passwordInput().clear()
      SignInPage.passwordInput().type(generateStringHelper())

      SignInPage.submitButton().click()
    }
  })
})

And('I have forgotten my password', () => {
  SignInPage.visit()
  SignInPage.forgotPasswordLink().click()

  ForgotPasswordPage.confirm()

  cy.get('@user').then((user) => {
    ForgotPasswordPage.emailInput().type(user.email)
    ForgotPasswordPage.submitButton().click()
  })

  cy.alertShouldContain(
    'If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.'
  )
})

When('I follow the link to unlock my account', () => {
  cy.get('@user').then((user) => {
    LastEmailPage.lastEmail([`Hello ${user.firstName} ${user.lastName}`, 'account has been locked'])

    cy.get('@lastEmail').then((lastEmail) => {
      const link = LastEmailPage.extractUnlockAccountLink(lastEmail.last_email.body)

      cy.visit(link)
    })
  })
})

And('request another unlock email', () => {
  SignInPage.visit()
  SignInPage.resendUnlockLink().click()
  ResendUnlockPage.confirm()

  cy.get('@user').then((user) => {
    ResendUnlockPage.emailInput().type(user.email)
    ResendUnlockPage.submitButton().click()
  })
})

Then('I will see confirmation my account is unlocked', () => {
  cy.alertShouldContain(
    'Your account has been unlocked successfully. Please sign in to continue.'
  )
})

But('I miss the first invitation email', () => {
  cy.get('@user').then((user) => {
    LastEmailPage.lastEmail([user.email, 'created an account'])

    cy.get('@lastEmail').then((lastEmail) => {
      const link = LastEmailPage.extractInvitationLink(lastEmail.last_email.body)

      cy.wrap(link).as('firstLink')
      cy.log(`The first link is ${link}`)
    })
  })
})

But('I miss the first unlock email', () => {
  cy.get('@user').then((user) => {
    LastEmailPage.lastEmail([`Hello ${user.firstName} ${user.lastName}`, 'account has been locked'])

    cy.get('@lastEmail').then((lastEmail) => {
      const link = LastEmailPage.extractUnlockAccountLink(lastEmail.last_email.body)

      cy.wrap(link).as('firstLink')
    })
  })
})

And('request another invitation email', () => {
  TransactionsPage.adminMenu.getOption('User Management', '').click()

  cy.get('@user').then((user) => {
    UsersPage.searchNameInput().type(user.lastName)
    UsersPage.submitButton().click()

    UsersPage.searchResultsTable().each((element, index) => {
      cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1}) td`).eq(2).invoke('text').then((email) => {
        if (email === user.email) {
          cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1})`).invoke('attr', 'id').then((id) => {
            UsersPage.searchResultEditButton(id).click()
            EditUserPage.resendInviteButton().click()
          })
        }
      })
    })
  })
})

Then('the TCM will confirm the user has been reinvited', () => {
  cy.alertShouldContain('User reinvited')
})

Then('I will see confirmation an unlock email has been sent', () => {
  cy.alertShouldContain(
    'If your account exists, you will receive an email with instructions for how to unlock it in a few minutes.'
  )
})
