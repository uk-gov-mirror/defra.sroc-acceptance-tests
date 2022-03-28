import { Given, When } from 'cypress-cucumber-preprocessor/steps'
import SignInPage from '../../../pages/sign_in_page'

Given('I visit the sign in page', () => {
  SignInPage.visit()
  SignInPage.confirm()
})

When('I enter my credentials', () => {
  SignInPage.emailInput().type(Cypress.config().users.system.email)
  SignInPage.passwordInput().type(Cypress.env('PASSWORD'))

  SignInPage.submitButton().click()
})
