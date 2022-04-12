import { When } from 'cypress-cucumber-preprocessor/steps'

import ForgotPasswordConfirmPage from '../../../pages/forgot_password_confirm_page'
import LastEmailPage from '../../../pages/last_email_page'

When('I follow the link to reset my password', () => {
  cy.get('@user').then((user) => {
    LastEmailPage.lastEmail([`Hello ${user.firstName} ${user.lastName}`, 'change your password'])

    cy.get('@lastEmail').then((lastEmail) => {
      const link = LastEmailPage.extractResetPasswordLink(lastEmail.last_email.body)

      cy.visit(link).then(() => {
        ForgotPasswordConfirmPage.confirm()

        ForgotPasswordConfirmPage.passwordInput().type(Cypress.env('PASSWORD'), { log: false })
        ForgotPasswordConfirmPage.passwordConfirmationInput().type(Cypress.env('PASSWORD'), { log: false })
        ForgotPasswordConfirmPage.submitButton().click()
      })
    })
  })
})
