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

// Added to support use of Cucumber features
const cucumber = require('cypress-cucumber-preprocessor').default

// Add support for .env files as used by Dotenv
const dotenvPlugin = require('cypress-dotenv')

// Used in the function below to ensure we have the correct path to our
// local config file
const path = require('path')

// Based mainly on
// https://docs.cypress.io/api/plugins/configuration-api.html#Switch-between-multiple-configuration-files
//
// We have altered it slightly to allow us the ability to treat
//
// - cypress.json as config shared across all environments
// - config/[environment].json for config specific to the current environment
//
// We then merge the to. The example does not allow for this.
function loadAndMergeConfig (config) {
  const environment = config.env.configFile || 'local'
  const pathToConfigFile = path.resolve('config', `${environment}.json`)
  const fileConfig = require(pathToConfigFile)

  return Object.assign({}, config, fileConfig)
}

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('file:preprocessor', cucumber())

  config = dotenvPlugin(config)

  config = loadAndMergeConfig(config)

  return config
}
