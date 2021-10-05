const reporter = require('cucumber-html-reporter')

const options = {
  theme: 'bootstrap',
  jsonDir: 'cypress/reports/json',
  output: 'cypress/reports/html/report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  ignoreBadJsonFile: true
}

reporter.generate(options)
