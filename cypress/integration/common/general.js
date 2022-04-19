import { Given, Then } from 'cypress-cucumber-preprocessor/steps'

import { fixturePickerHelper } from '../../support/helpers'

Then('I see {string} in the main heading', (title) => {
  cy.get('h1').contains(title)
})

Given('I am starting with known {word} data', (regimeSlug) => {
  cy.task('regime', regimeSlug).then((regime) => {
    cy.wrap(regime).as('regime')
  })

  cy.cleanDb()

  const fixtureFilename = fixturePickerHelper(regimeSlug)

  cy.fixture(fixtureFilename)
    .then(Body => {
      cy.task('s3Upload', {
        Body,
        Bucket: Cypress.env('S3_BUCKET'),
        remotePath: Cypress.env('S3_UPLOAD_PATH'),
        filename: fixtureFilename
      })
    })
    .then(fullPath => {
      cy.log(`${fullPath} uploaded`)
    })
  cy.runJob('import')
})

Given('I am starting with known data', () => {
  cy.cleanDb()

  const fixtureFiles = [fixturePickerHelper('cfd'), fixturePickerHelper('pas'), fixturePickerHelper('wml')]

  fixtureFiles.forEach((fixtureFilename) => {
    cy.log(`Fixture file name is ${fixtureFilename}`)
    cy.fixture(fixtureFilename)
      .then(Body => {
        cy.task('s3Upload', {
          Body,
          Bucket: Cypress.env('S3_BUCKET'),
          remotePath: Cypress.env('S3_UPLOAD_PATH'),
          filename: fixtureFilename
        })
      })
      .then(fullPath => {
        cy.log(`${fullPath} uploaded`)
      })
  })

  cy.runJob('import')
})
