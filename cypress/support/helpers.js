import { faker } from '@faker-js/faker'

// If you have any logic you think could be used in multiple places and that doesn't include any cy or Cypress calls
// then they should be placed here.
//
// There is nothing wrong with having logic within a step. But especially if that logic could be used elsewhere adding
// it as a helper helps reduce the complexity of the steps and makes the project a little more maintainable.

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

export default { fixturePickerHelper, generateUserHelper, generateStringHelper }
