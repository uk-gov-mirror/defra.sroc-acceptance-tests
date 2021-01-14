import { Given, When } from 'cypress-cucumber-preprocessor/steps'
import SignInPage from '../../pages/sign_in_page'

Given('I visit the sign in page', () => {
  SignInPage.visit()
})

When('I enter my credentials', () => {
  SignInPage.email().type(Cypress.config().users.system.email)
  SignInPage.password().type(Cypress.env('PASSWORD'))

  SignInPage.logIn().click()
})
