class TransactionsMenu {
  static get selector () {
    return '[aria-labelledby="navbarTransactionsSelectorLink"]'
  }

  static options (regimeSlug) {
    return {
      'Transactions to be billed': `[href="/regimes/${regimeSlug}/transactions"]`,
      'Transaction History': `[href="/regimes/${regimeSlug}/history"]`,
      'Pre-April 2018 Transactions to be billed': `[href="/regimes/${regimeSlug}/retrospectives"]`,
      'Excluded Transactions': `[href="/regimes/${regimeSlug}/exclusions"]`,
      'Imported Transaction Files': `[href="/regimes/${regimeSlug}/imported_transaction_files"]`,
      'Transaction File History': `[href="/regimes/${regimeSlug}/transaction_files"]`,
      'Download Transaction Data': `[href="/regimes/${regimeSlug}/data_export"]`
    }
  }

  static menuLink () {
    return cy.get('#navbarTransactionsSelectorLink')
  }

  static getOption (optionText, regimeSlug) {
    this.menuLink().click()

    return cy.get(`${this.selector} > ${this.options(regimeSlug)[optionText]}`)
  }
}

export default TransactionsMenu
