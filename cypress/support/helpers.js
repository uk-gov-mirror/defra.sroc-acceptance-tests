import { faker } from '@faker-js/faker'

// If you have any logic you think could be used in multiple places and that doesn't include any cy or Cypress calls
// then they should be placed here.
//
// There is nothing wrong with having logic within a step. But especially if that logic could be used elsewhere adding
// it as a helper helps reduce the complexity of the steps and makes the project a little more maintainable.

/**
 * Use to get column details for a particular regime's transactions to be billed results table
 *
 * Written primarily to support our `cypress/integration/transactions/sorting.feature` given a column name (as seen in
 * the UI) and regime it will return its data-column name and TD nth-child position. We can then use this to grab the
 * value of a particular field.
 *
 * We need to know the regime because the results table is different for each one.
 *
 * If the a matching column is not found it will throw an error. This is intended to help highlight errors caused by
 * typos of using the wrong case quickly.
 */
export function columnPickerHelper (column, regime) {
  const sharedColumns = {
    Customer: { name: 'customer_reference', index: 4 },
    'File Date': { name: 'file_date', index: 3 },
    'File Reference': { name: 'file_reference', index: 2 }
  }

  const regimeColumns = {
    pas: {
      Band: { name: 'compliance_band', index: 9 },
      Category: { name: 'sroc_category', index: 7 },
      'Original Permit': { name: 'original_permit_reference', index: 6 },
      Period: { name: 'period', index: 11 },
      Permit: { name: 'permit_reference', index: 5 }
    },
    cfd: {
      Category: { name: 'sroc_category', index: 8 },
      Consent: { name: 'consent_reference', index: 5 },
      Period: { name: 'period', index: 12 },
      '%': { name: 'variation', index: 10 }
    },
    wml: {
      Band: { name: 'compliance_band', index: 8 },
      Category: { name: 'sroc_category', index: 6 },
      Period: { name: 'period', index: 10 },
      Permit: { name: 'permit_reference', index: 5 }
    }
  }

  const columns = {
    ...sharedColumns,
    ...regimeColumns[regime]
  }
  console.log(columns)

  if (column in columns) {
    return columns[column]
  }

  throw new Error(`Column '${column}' is unknown. Check your spelling and case!`)
}

/**
 * Use to determine which fixture file (test transaction import file) to use based on a regime slug
 *
 * We could have had steps in features just state the file name. But we felt it would read better in the scenario if
 * instead the regime was stated, for example, "Given I am starting with known cfd data".
 */
export function fixturePickerHelper (regimeSlug) {
  const fixtures = {
    cfd: 'cfdai394.dat.csv',
    pas: 'pasai394.dat.csv',
    wml: 'wmlai394.dat.csv'
  }

  return fixtures[regimeSlug]
}

/**
 * Helper that generates an object that represents a TCM user
 *
 * The values can then be used when creating a new user in the service
 *
 * @param {string} role Role to assign to the user. Valid values are `read_only`, `read_only_export`, `billing` and
 * `admin`. Defaults to `read_only`
 * @param {string[]} regimes Array of regimes to assign. Valid values are `pas`, `wml` and `cfd`. Defaults to
 * `['cfd']`
 *
 * @returns {object} an object that contains the properties of the generated user
 */
export function generateUserHelper (role = 'read_only', regimes = ['cfd']) {
  const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    role,
    regimes
  }

  // First part of the email address before the @. We add a random number to the end to avoid clashing with an existing
  // test user record. We also have to handle faker returning names like O'Doyle.
  const emailName = `${user.firstName}.${user.lastName}${faker.datatype.number({ min: 10, max: 100 })}`.replace("'", '')
  // Second part of the email address. The TCM always lowercases all email addresses so we do incase a test is using
  // it as a search value
  user.email = `${emailName}@example.com`.toLowerCase()

  return user
}

/**
 * Helper that generates a string of random characters
 *
 * @param {Number} length The length of string to generate. Defaults to 8 which is the minimum password length
 *
 * @returns {string} A string of random characters of the length specified
 */
export function generateStringHelper (length = 8) {
  return faker.random.alpha({ count: length })
}

export default { columnPickerHelper, fixturePickerHelper, generateUserHelper, generateStringHelper }
