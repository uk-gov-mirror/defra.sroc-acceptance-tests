import { And, Then, When } from 'cypress-cucumber-preprocessor/steps'

import TransactionsMenu from '../../../pages/menus/transactions_menu'

When('I select {string} from the Transactions menu', (optionText) => {
  TransactionsMenu.getOption(optionText, 'pas').click()
})

And('I click the export button', () => {
  cy.get('button.table-export-btn').click()
})

Then('the data protection notice modal is displayed', () => {
  cy.get('#data-protection-dialog')
    .should('have.class', 'show')
    .should('have.attr', 'aria-modal')
  cy.get('#data-protection-dialog').should('not.have.attr', 'aria-hidden')

  cy.get('#data-protection-dialog h5.modal-title')
    .should('be.visible')
    .should('contain.text', 'Export Transaction Data')

  // TODO: Understand why we need this explicit wait() here. We've confirmed that the modal dialog is open
  // and visible and that we can access the controls. But without this wait() we find more often than not the
  // dialog is not dismissed when cancel is clicked which causes an error in the tests
  cy.wait(500)

  cy.get('#data-protection-dialog button.btn[data-dismiss="modal"]')
    .should('be.visible')
    .click()
})
