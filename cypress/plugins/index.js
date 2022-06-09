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

const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3')

// Added to support use of Cucumber features
const cucumber = require('cypress-cucumber-preprocessor').default

// Add support for .env files as used by Dotenv
const dotenvPlugin = require('cypress-dotenv')

// Used in the function below to ensure we have the correct path to our
// local config file
const path = require('path')

// Add support for uncompressing gzip files (the TCM compress the data export files as .gz)
const zlib = require('zlib')

// Add support for reading and writing from the file system
const fs = require('fs')

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
 * We use GetObjectCommand to read data from an S3 bucket. This returns a readable stream of data, which we need to
 * read in chunks then convert to a string for it to be usable.
 * https://github.com/aws/aws-sdk-js-v3/issues/1877
 * https://stackoverflow.com/questions/10623798/how-do-i-read-the-contents-of-a-node-js-stream-into-a-string-variable
 */
function streamToString (stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on('error', (err) => reject(err))
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

// Adds support to download files. We use it to allow us to download things like the transaction data file export which
// replicates following links in the UI rather than downloading them directly from AWS S3
const { downloadFile } = require('cypress-downloadfile/lib/addPlugin')

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('file:preprocessor', cucumber())

  on('task', {
    downloadFile,

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
    },

    s3Download ({ Bucket, remotePath, filePath }) {
      // We use a template literal to combine the paths rather than path.join() to ensure it joins them with a forward
      // slash as required by S3 (which wouldn't happen if running under Windows).
      const Key = `${remotePath}/${filePath}`
      const client = new S3Client()
      const command = new GetObjectCommand({ Bucket, Key })

      return new Promise((resolve, reject) => {
        client
          .send(command)
          .then(
            // If client.send() was successful then resolve the promise so Cypress can continue.
            response => {
              // GetObjectCommand gives us a stream of data, which we convert into a string and then return.
              streamToString(response.Body)
                .then(data => {
                  resolve(data)
                })
            },
            // If client.send() failed then reject the promise so Cypress can throw an error
            error => {
              reject(error)
            })
      })
    },

    regime (identifier) {
      const regimes = {
        pas: 'Installations',
        wml: 'Waste',
        cfd: 'Water Quality'
      }
      let result
      for (const [key, value] of Object.entries(regimes)) {
        if (key === identifier.toLowerCase() || value.toLowerCase() === identifier.toLowerCase()) {
          result = { slug: key, name: value }
        }
      }

      return result
    },

    /**
     * Use to unzip a file
     *
     * Added to support testing of the transaction data file export. The TCM compresses the export for each regime into
     * a gzip file. In order to access the data we need to unzip it.
     *
     * https://www.knowledgehut.com/blog/web-development/compression-decompression-of-data-using-zlib-in-Nodejs
    */
    unzip ({ readFilename, writeFilename }) {
      // You don't need to worry if `writeFilename` already exists in `cypress/downloads`. This process overwrites it
      // automatically.
      const readFilePath = path.join('cypress', 'downloads', readFilename)
      const input = fs.createReadStream(readFilePath)

      const writeFilePath = path.join('cypress', 'downloads', writeFilename)
      const output = fs.createWriteStream(writeFilePath)

      const unzip = zlib.createUnzip()
      input.pipe(unzip).pipe(output)

      return writeFilePath
    }
  })

  config = loadDotenvPlugin(config)

  return config
}
