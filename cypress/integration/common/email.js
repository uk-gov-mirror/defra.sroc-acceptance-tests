import { And, But, Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
import { generateUserHelper, generateStringHelper } from '../../support/helpers'

import AcceptInvitePage from '../../pages/accept_invite_page'
import AddUserPage from '../../pages/add_user_page'
import EditUserPage from '../../pages/edit_user_page'
import ForgotPasswordPage from '../../pages/forgot_password_page'
import LastEmailPage from '../../pages/last_email_page'
import MainMenu from '../../pages/menus/main_menu'
import ResendUnlockPage from '../../pages/resend_unlock_page'
import SignInPage from '../../pages/sign_in_page'
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

  MainMenu.admin.getOption('User Management', '').click()

  UsersPage.addUserAccount().click()

  cy.get('@user').then((user) => {
    AddUserPage.email().type(user.email)
    AddUserPage.firstName().type(user.firstName)
    AddUserPage.lastName().type(user.lastName)

    AddUserPage.regimeAccess('Waste').click()
    AddUserPage.addAndInviteUser().click()

    cy.get('.col > .alert')
      .should('contain.text', 'User account created')
  })
})

And('I accept the invitation', () => {
  cy.signOut()

  cy.get('@user').then((user) => {
    LastEmailPage.lastEmail([user.email, 'created an account'])

    cy.get('@lastEmail').then((lastEmail) => {
      const link = LastEmailPage.extractInvitationLink(lastEmail.last_email.body)

      cy.visit(link).then(() => {
        AcceptInvitePage.mainHeading().should('contain', 'Set a password')

        AcceptInvitePage.password().type(Cypress.env('PASSWORD'), { log: false })
        AcceptInvitePage.passwordConfirmation().type(Cypress.env('PASSWORD'), { log: false })
        AcceptInvitePage.setPassword().click()
      })
    })
  })
})

Then('I will be signed in with my new account', () => {
  cy.get('@user').then((user) => {
    const username = `${user.firstName} ${user.lastName}`
    MainMenu.user.menuLink().should('contain', username)
  })
})

And('I incorrectly enter my password 5 times', () => {
  cy.get('@user').then((user) => {
    SignInPage.email().type(user.email)

    for (let i = 0; i < 5; i++) {
      SignInPage.password().clear()
      SignInPage.password().type(generateStringHelper())

      SignInPage.logIn().click()
    }
  })
})

And('I have forgotten my password', () => {
  SignInPage.visit()
  SignInPage.forgotPasswordLink().click()

  ForgotPasswordPage.mainHeading().should('contain', 'Forgot your password?')

  cy.get('@user').then((user) => {
    ForgotPasswordPage.email().type(user.email)
    ForgotPasswordPage.sendMeResetPasswordInstructions().click()
  })

  cy.get('.col > .alert')
    .should(
      'contain.text',
      'If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.'
    )
})

When('I follow the link to unlock my account', () => {
  cy.get('@user').then((user) => {
    LastEmailPage.lastEmail([user.email, 'Your account has been locked'])

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
    ResendUnlockPage.email().type(user.email)
    ResendUnlockPage.resendUnlockInstructions().click()
  })
})

Then('I will see confirmation my account is unlocked', () => {
  cy.get('.col > .alert')
    .should(
      'contain.text',
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
    LastEmailPage.lastEmail([user.email, 'Your account has been locked'])

    cy.get('@lastEmail').then((lastEmail) => {
      const link = LastEmailPage.extractUnlockAccountLink(lastEmail.last_email.body)

      cy.wrap(link).as('firstLink')
    })
  })
})

And('request another invitation email', () => {
  MainMenu.admin.getOption('User Management', '').click()

  cy.get('@user').then((user) => {
    UsersPage.searchName().type(user.lastName)
    UsersPage.search().click()

    UsersPage.searchResults().each((element, index) => {
      cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1}) td`).eq(2).invoke('text').then((email) => {
        if (email === user.email) {
          cy.get(`.table-responsive > tbody > tr:nth-child(${index + 1})`).invoke('attr', 'id').then((id) => {
            UsersPage.searchResultEdit(id).click()
            EditUserPage.resendInvite().click()
          })
        }
      })
    })
  })
})

Then('the TCM will confirm the user has been reinvited', () => {
  cy.get('.col > .alert')
    .should(
      'contain.text',
      'User reinvited'
    )
})

Then('I will see confirmation an unlock email has been sent', () => {
  cy.get('.col > .alert')
    .should(
      'contain.text',
      'If your account exists, you will receive an email with instructions for how to unlock it in a few minutes.'
    )
})
