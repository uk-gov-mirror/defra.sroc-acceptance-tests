class LastEmailPage {
  /**
   * Get the last email stored in the TCM
   *
   * The TCM when running in our non-production environments stores in a local cache details of the last email sent.
   * Along with that is a special endpoint that returns the last email as a JSON object. We can then use this in our
   * testing to confirm emails are working and journeys that require interacting with a link sent in an email can be
   * included.
   *
   * The details are _not_ stored in the cenral DB. They are cached in the running instance. The issue when it comes
   * to a production setup, like our AWS environments, is that we have multiple instances of the app running at all
   * times. So, we could trigger an email on instance A, but when we then visit the `/last-email` page we are routed to
   * instance B. This is something we have experienced on WEX, WCR and FRAE when testing and solved by using polling.
   *
   * We send the request to `GET` the last email page up to 10 times. Each time we check what we find against what we
   * expect to see. Once we have confirmed we are viewing the expected email we pass control back. If however, we don't
   * get a match we reduce the poll count by 1 and then use recursion to try again. In the event no email has the
   * details we expect to find we through an error.
   *
   * @param {string[]} expectedText Array of strings which represent text we expect to find in the email body to
   *                   determine we have the right 'last email'. Defaults to an empty array.
   * @param {number} pollCount Number of times to poll the endpoint. Defaults to 10.
  */
  static lastEmail (expectedText = [], pollCount = 10) {
    if (expectedText === [] || pollCount === 0) {
      throw new Error(`LastEmail failed to match ${expectedText}`)
    }

    cy.request('GET', 'last-email').then((response) => {
      expect(response.status).to.equal(200)

      const message = response.body.last_email.body
      if (this._expectedEmail(expectedText, message)) {
        cy.wrap(response.body).as('lastEmail')
      } else {
        this.lastEmail(expectedText, --pollCount)
      }
    })
  }

  /**
   * Extract the invitation link from the invitation email message
   *
   * @param {string} message the body of the email which contains the invitation link we are trying to extract
   *
   * @returns {string} the link to follow to accept the invitation. Will return an empty string if no match is found
   */
  static extractInvitationLink (message) {
    const pattern = /https?:\/\/.{14,35}\/auth\/invitation\/accept\?invitation_token=.{20}/gi

    return this._extractLink(pattern, message)
  }

  /**
   * Extract the reset password link from the forgotten password email message
   *
   * @param {string} message the body of the email which contains the reset password link we are trying to extract
   *
   * @returns {string} the link to follow to reset the password. Will return an empty string if no match is found
   */
  static extractResetPasswordLink (message) {
    const pattern = /https?:\/\/.{14,35}\/auth\/password\/edit\?reset_password_token=.{20}/gi

    return this._extractLink(pattern, message)
  }

  /**
   * Extract the account unlock link from the unlock account email message
   *
   * @param {string} message the body of the email which contains the unlock account link we are trying to extract
   *
   * @returns {string} the link to follow to unlock the account. Will return an empty string if no match is found
   */
  static extractUnlockAccountLink (message) {
    const pattern = /https?:\/\/.{14,35}\/auth\/unlock\?unlock_token=.{20}/gi

    return this._extractLink(pattern, message)
  }

  /**
   * Checks the email message body contains all the expected text
   *
   * @param {string[]} expectedText Array of strings which represent text we expect to find in the email body to
   *                   determine we have the right 'last email'. Defaults to an empty array.
   * @param {string} body The email message body we're checking
  */
  static _expectedEmail (expectedText, body) {
    return expectedText.every((text) => {
      return body.includes(text)
    })
  }

  static _extractLink (pattern, message) {
    const matches = message.match(pattern)

    // You have the link itself and what is shown in the email so we always expect 2 matches. Both are identical so we
    // just return the first result
    if (matches) {
      return matches[0]
    }

    return ''
  }
}

export default LastEmailPage
