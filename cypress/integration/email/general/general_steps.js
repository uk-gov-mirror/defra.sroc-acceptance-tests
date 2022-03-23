import { When } from 'cypress-cucumber-preprocessor/steps'

import ChangePasswordPage from '../../../pages/change_password_page'
import LastEmailPage from '../../../pages/last_email_page'

When('I follow the link to reset my password', () => {
  cy.get('@user').then((user) => {
    LastEmailPage.lastEmail([`Hello ${user.firstName} ${user.lastName}`, 'change your password'])

    cy.get('@lastEmail').then((lastEmail) => {
      const link = LastEmailPage.extractResetPasswordLink(lastEmail.last_email.body)

      cy.visit(link).then(() => {
        ChangePasswordPage.mainHeading().should('contain', 'Change your password')

        ChangePasswordPage.password().type(Cypress.env('PASSWORD'), { log: false })
        ChangePasswordPage.passwordConfirmation().type(Cypress.env('PASSWORD'), { log: false })
        ChangePasswordPage.changeMyPassword().click()
      })
    })
  })
})
