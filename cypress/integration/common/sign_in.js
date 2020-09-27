import { Given } from 'cypress-cucumber-preprocessor/steps'
import SignInPage from '../../pages/sign_in_page'

Given('I sign in as the {string} user', (user) => {
  SignInPage.visit()
  SignInPage.email().type(Cypress.config().users[user])
  SignInPage.password().type(Cypress.env('PASSWORD'))

  SignInPage.logIn().click()
})
