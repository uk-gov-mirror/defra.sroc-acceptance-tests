import { Given } from 'cypress-cucumber-preprocessor/steps'

Given('I import the file {string}', (filename) => {
  cy.fixture(filename)
    .then(Body => {
      cy.task('s3Upload', {
        Body,
        Bucket: Cypress.env('S3_BUCKET'),
        remotePath: Cypress.env('S3_PATH'),
        filename
      })
    })
    .then(fullPath => {
      cy.log(`${fullPath} uploaded`)
    })
})
