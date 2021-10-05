import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps'

Given('a cucumber that is {int} cm long', (length) => {
  cy.wrap({ color: 'green', size: length }).as('cucumber')
})

When('I cut it in halves', () => {
  cy.get('@cucumber').then((cucumber) => {
    cy.wrap(
      [{ color: 'green', size: cucumber.size / 2 }, { color: 'green', size: cucumber.size / 2 }]
    ).as('choppedCucumbers')
  })
})

Then('I have two cucumbers', () => {
  cy.get('@choppedCucumbers').then((choppedCucumbers) => {
    expect(choppedCucumbers).to.have.lengthOf(2)
  })
})

And('both are {int} cm long', (length) => {
  cy.get('@choppedCucumbers').then((choppedCucumbers) => {
    choppedCucumbers.forEach((cucumber) => {
      expect(cucumber.size).to.equal(length)
    })
  })
})
