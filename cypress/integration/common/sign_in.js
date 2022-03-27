import { Given } from 'cypress-cucumber-preprocessor/steps'
import SignInPage from '../../pages/sign_in_page'

Given('I sign in as the {string} user', (user) => {
  SignInPage.visit()
  SignInPage.emailInput().type(Cypress.config().users[user].email)
  SignInPage.passwordInput().type(Cypress.env('PASSWORD'))

  SignInPage.submitButton().click()
})
