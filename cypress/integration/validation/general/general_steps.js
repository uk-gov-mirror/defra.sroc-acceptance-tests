import { Then, When } from 'cypress-cucumber-preprocessor/steps'

import TransactionsPage from '../../../pages/transactions_page'
import PermitCategoriesPage from '../../../pages/permit_categories_page'
import AddPermitCategoryPage from '../../../pages/add_permit_category_page'

When('I attempt to create a permit category with an invalid code', () => {
  TransactionsPage.adminMenu.getOption('Permit Categories', 'pas').click()

  PermitCategoriesPage.addNewPermitCategoryButton().click()

  AddPermitCategoryPage.codeInput().type('QWERTY', { log: false })
  AddPermitCategoryPage.descriptionInput().type('Test Description', { log: false })
  AddPermitCategoryPage.submitButton().click()
})

Then('I am told the code must be in dotted numeric format', () => {
  cy.alertShouldContain('Code Code must be in dotted numeric format, with 1 to 3 segments between 1 and 4 digits long. e.g. 6, 1.2, 9.34.1, 27.111.1234')
})

When('I attempt to create a permit category with a blank code', () => {
  TransactionsPage.adminMenu.getOption('Permit Categories', 'pas').click()

  PermitCategoriesPage.addNewPermitCategoryButton().click()

  AddPermitCategoryPage.descriptionInput().type('Test Description', { log: false })
  AddPermitCategoryPage.submitButton().click()
})

Then('I am told the code cannot be blank', () => {
  cy.alertShouldContain('Code can\'t be blank')
})

When('I attempt to create a permit category with {string}', (invalidCharacter) => {
  TransactionsPage.adminMenu.getOption('Permit Categories', 'pas').click()

  PermitCategoriesPage.addNewPermitCategoryButton().click()

  AddPermitCategoryPage.codeInput().type('1.5', { log: false })
  AddPermitCategoryPage.descriptionInput().type('Test Description' + invalidCharacter, { log: false })
  AddPermitCategoryPage.submitButton().click()
})

Then('I am told these characters are not permitted', () => {
  cy.alertShouldContain('Description contains characters that are not permitted. Please modify your description to remove them.')
})

When('I attempt to create a permit category with a blank description', () => {
  TransactionsPage.adminMenu.getOption('Permit Categories', 'pas').click()

  PermitCategoriesPage.addNewPermitCategoryButton().click()

  AddPermitCategoryPage.codeInput().type('1.5', { log: false })
  AddPermitCategoryPage.submitButton().click()
})

Then('I am told the description cannot be blank', () => {
  cy.alertShouldContain('Description can\'t be blank')
})
