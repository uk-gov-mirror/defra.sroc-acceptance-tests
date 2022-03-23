import { And, But, Then, When } from 'cypress-cucumber-preprocessor/steps'

import ChangePasswordPage from '../../../pages/change_password_page'
import ForgotPasswordPage from '../../../pages/forgot_password_page'
import LastEmailPage from '../../../pages/last_email_page'
import ResendUnlockPage from '../../../pages/resend_unlock_page'
import SignInPage from '../../../pages/sign_in_page'

But('I miss the first reset password email', () => {
  cy.get('@user').then((user) => {
    LastEmailPage.lastEmail([`Hello ${user.firstName} ${user.lastName}`, 'change your password'])

    cy.get('@lastEmail').then((lastEmail) => {
      const link = LastEmailPage.extractResetPasswordLink(lastEmail.last_email.body)

      cy.wrap(link).as('firstLink')
    })
  })
})

And('request another reset password email', () => {
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

And('I try to accept the first invitation email', () => {
  cy.signOut()

  cy.get('@firstLink').then((firstLink) => {
    cy.visit(firstLink)
  })
})

And('I try to accept the first unlock email', () => {
  cy.get('@firstLink').then((firstLink) => {
    cy.visit(firstLink)
  })
})

When('I try to accept the first reset password email', () => {
  cy.get('@firstLink').then((firstLink) => {
    cy.visit(firstLink).then(() => {
      ChangePasswordPage.confirm()

      ChangePasswordPage.password().type(Cypress.env('PASSWORD'), { log: false })
      ChangePasswordPage.passwordConfirmation().type(Cypress.env('PASSWORD'), { log: false })
      ChangePasswordPage.changeMyPassword().click()
    })
  })
})

Then('the TCM will confuse me and not be helpful', () => {
  cy.log('User redirected to the sign in page with no message about token being invalid')
  cy.get('.col > .alert')
    .should(
      'contain.text',
      'You need to sign in before continuing'
    )
  cy.url().should('include', '/auth/sign_in')
})

Then('I will be told my token is invalid', () => {
  cy.get('h2').should('contain', 'error prohibited this user from being saved')
  cy.get('div#error_explanation > ul > li').should('contain', 'Reset password token is invalid')
})

Then('I will be directed to the resend unlock page and told my token is invalid', () => {
  ResendUnlockPage.confirm()

  cy.get('h2').should('contain', 'error prohibited this user from being saved')
  cy.get('div#error_explanation > ul > li').should('contain', 'Unlock token is invalid')
})
