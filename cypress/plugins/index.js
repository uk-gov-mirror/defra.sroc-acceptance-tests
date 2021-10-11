/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// Our custom config handler
// import EnvironmentConfig from '../../config/index'

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

// Added to support use of Cucumber features
const cucumber = require('cypress-cucumber-preprocessor').default

// Add support for .env files as used by Dotenv
const dotenvPlugin = require('cypress-dotenv')

// Used in the function below to ensure we have the correct path to our
// local config file
const path = require('path')

/**
 * Load the cypress-dotenv plugin and read env vars for a specific environment
 *
 * Each environment (DEV, TEST, PRE-PROD etc) has config specific to it which we also need to keep secret and not commit
 * to the repo. Reading these values from environment variables is the '12-factor app' way to do this but we also want
 * to be able to quickly switch between them.
 *
 * The dotenv package supports this by automatically loading env vars from a file when an app loads rather than having
 * to set them before hand in our profile or bash session.
 *
 * The cypress-dotenv package takes this one step further by allowing you to override expected config such as `baseUrl`
 * with an env var. It also will make anything declared as `CYPRESS_MY_VAR` available in the tests using
 * `Cypress.env('MY_VAR')`.
 *
 * Using https://docs.cypress.io/api/plugins/configuration-api.html#Switch-between-multiple-configuration-files as an
 * inspiration we have added the ability to set an environment when cypress is called and have the project read its
 * config from a matching `environments/.env` file
*/
function loadDotenvPlugin (config) {
  const environment = config.env.environment || 'local'

  const pathToEnvFile = path.resolve('environments', `.${environment}.env`)

  return dotenvPlugin(config, { path: pathToEnvFile }, true)
}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('file:preprocessor', cucumber())

  on('task', {
    s3Upload ({ Body, Bucket, remotePath, filename }) {
      // We use a template literal to combine the path and filename rather than path.join() to ensure it joins them
      // with a forward slash as required by S3 (which wouldn't happen if running under Windows).
      const Key = `${remotePath}/${filename}`
      const client = new S3Client()
      const command = new PutObjectCommand({ Bucket, Key, Body })

      return new Promise((resolve, reject) => {
        client
          .send(command)
          .then(
            // If client.send() was successful then resolve the promise so Cypress can continue, returning the remote
            // file path so we can log it.
            data => {
              resolve(`${Bucket}/${Key}`)
            },
            // If client.send() failed then reject the promise so Cypress can throw an error
            error => {
              reject(error)
            })
      })
    }
  })

  config = loadDotenvPlugin(config)

  return config
}
