import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('I see {string} in the main heading', (title) => {
  cy.get('h1').contains(title)
})
