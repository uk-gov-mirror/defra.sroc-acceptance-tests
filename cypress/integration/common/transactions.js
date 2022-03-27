import { When } from 'cypress-cucumber-preprocessor/steps'
import TransactionsPage from '../../pages/transactions_page'

When('I select the {string} regime', (regimeName) => {
  cy.task('regime', regimeName).then((regime) => {
    cy.wrap(regime).as('regime')

    TransactionsPage.regimeMenu.getOption(regime.name).click()
  })
})
