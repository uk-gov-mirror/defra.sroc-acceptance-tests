import SignInPage from '../pages/sign_in_page'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/**
 * Use when you want to authenticate via the UI
 *
 * It will complete the form and then submit it using the button in order to authenticate
 */
Cypress.Commands.add('signIn', (email, password = Cypress.env('PASSWORD')) => {
  SignInPage.visit()
  SignInPage.emailInput().type(email)
  SignInPage.passwordInput().type(password, { log: false })
  SignInPage.submitButton().click()
})

/**
 * Use when you just need to authenticate the user and avoid the UI
 *
 * Because of Rails CSRF protections we still need to visit the sign in page to extract a valid csrf-token. But after
 * that we can authenticate without having to interact with the UI. This speeds things up and allows tests to focus on
 * the feature under test.
 *
 * To help avoid cluttering the log the Cypress calls in this command are silent
 */
Cypress.Commands.add('authenticate', (email, password = Cypress.env('PASSWORD')) => {
  cy.log(`Authenticating ${email}`)
  cy.visit('auth/sign_in', { log: false })
  cy.get('meta[name="csrf-token"]', { log: false })
    .invoke({ log: false }, 'attr', 'content')
    .then((csrfToken) => {
      cy.request({
        log: false,
        method: 'POST',
        url: '/auth/sign_in', // baseUrl will be prepended to this url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        body: {
          authenticity_token: csrfToken,
          'user[email]': email,
          'user[password]': password
        }
      })
    })
})

/**
 * Use when you need to sign out the user i.e. kill the current session
 *
 * There are often times we need to sign in as one user in order to setup a test before then signing in as
 * another to complete the test. In order to sign in as the second we need to sign out of the first and
 * this command is a handy means of doing it.
 */
Cypress.Commands.add('signOut', () => {
  cy.log('Signing out')
  cy.get('#navbarUserMenuLink', { log: false })
    .click({ log: false })
  cy.get('[aria-labelledby="navbarUserMenuLink"] > [href="/auth/sign_out"]', { log: false })
    .click({ log: false })
})

/**
 * Use when you need to create a user but avoid the UI to do so
 *
 * Because of Rails CSRF protections we still need to visit the add user page to extract a valid csrf-token. But after
 * that we can create the user without having to interact with the UI. This speeds things up and allows tests to focus
 * on the feature under test.
 *
 * To help avoid cluttering the log the Cypress calls in this command are silent
 */
Cypress.Commands.add('addUser', (user) => {
  cy.log(`Adding user ${user.email}`)
  cy.visit('users/new', { log: false })
  cy.get('meta[name="csrf-token"]', { log: false })
    .invoke({ log: false }, 'attr', 'content')
    .then((csrfToken) => {
      cy.request({
        log: false,
        method: 'POST',
        url: '/users', // baseUrl will be prepended to this url
        form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
        body: {
          authenticity_token: csrfToken,
          'user[email]': user.email,
          'user[first_name]': user.firstName,
          'user[last_name]': user.lastName,
          'user[enabled]': 1,
          'user[role]': user.role,
          'user[regime_users_attributes][0][regime_id]': 1,
          'user[regime_users_attributes][0][enabled]': user.regimes.includes('pas'),
          'user[regime_users_attributes][1][regime_id]': 3,
          'user[regime_users_attributes][1][enabled]': user.regimes.includes('wml'),
          'user[regime_users_attributes][2][regime_id]': 2,
          'user[regime_users_attributes][2][enabled]': user.regimes.includes('cfd')
        }
      })
    })
})

/**
 * Use when you want to check an alert contains a certain message
 *
 * An action will often lead to alert appearing that is shown on the page after the one we have been interacting with.
 * To avoid importing the landing page into steps just to check its alert i.e. if we'd added this method to BasePage.js,
 * we instead add it as a custom command.
 *
 * It means we can check the alert without first having to declare the page we are on. But having it as a command means
 * we can define in just one place what the selector for our alerts is.
 */
Cypress.Commands.add('alertShouldContain', (text) => {
  cy.get('.col > .alert').should('contain.text', text)
})

/**
 * Use when you want to clean the database of transaction based data
 *
 * Some of the features depend on the data being in a known state. That way expectations about, for example, finding
 * certain transactions to approve will succeed.
 *
 * The `/clean` command in the TCM doesn't completely reset the DB. Lookup tables such as permit categories, and records
 * such as user accounts are left untouched. But anything to do with transactions, transaction files, and import and
 * export history is all deleted and the identifiers restarted.
 */
Cypress.Commands.add('cleanDb', () => {
  cy.log('Cleaning the database')
  cy.request({
    log: false,
    method: 'GET',
    url: '/clean'
  }).its('status', { log: false }).should('equal', 200)
})
