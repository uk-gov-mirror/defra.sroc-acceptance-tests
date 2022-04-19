import BaseTable from './base_table'

class RetrospectiveTransactionsToBeBilledTable extends BaseTable {
  static categorySelect (rowNumber) {
    return cy.get(`.table-responsive > tbody > tr:nth-child(${rowNumber + 1}) input.tcm-select-input`)
  }

  static cell (rowNumber, columnName, regimeSlug) {
    const column = this.columnPicker(columnName, regimeSlug)

    return cy.get(`.table-responsive tr:nth-child(${rowNumber + 1}) td:nth-child(${column.index})`)
  }

  static cells (columnName, regimeSlug) {
    const column = this.columnPicker(columnName, regimeSlug)

    return cy.get(`.table-responsive tr td:nth-child(${column.index})`)
  }

  static showDetailsButton (rowNumber) {
    return cy.get(`.table-responsive tr:nth-child(${rowNumber + 1}) button.show-details-button`)
  }

  static temporaryCessationSelect (rowNumber) {
    return cy.get(`.table-responsive tr:nth-child(${rowNumber + 1}) select.temporary-cessation-select`)
  }

  // support

  /**
   * Use to get all column details for a particular regime
   *
   * We need to know the regime because the transactions to be billed table is different for each one.
   */
  static columns (regimeSlug) {
    const sharedColumns = {
      Customer: { name: 'customer_reference', index: 4 },
      'File Date': { name: 'file_date', index: 3 },
      'File Reference': { name: 'file_reference', index: 2 }
    }

    const regimeColumns = {
      pas: {
        Amount: { name: 'line_amount', index: 9 },
        Band: { name: 'compliance_band', index: 7 },
        'Original Permit': { name: 'original_permit_reference', index: 6 },
        Period: { name: 'period', index: 8 },
        Permit: { name: 'permit_reference', index: 5 }
      },
      cfd: {
        Amount: { name: 'line_amount', index: 10 },
        Consent: { name: 'consent_reference', index: 5 },
        Dis: { name: 'discharge', index: 7 },
        Period: { name: 'period', index: 9 },
        Ver: { name: 'version', index: 6 },
        '%': { name: 'variation', index: 8 }
      },
      wml: {
        // Waste does not support retrospective transactions so this page does
        // not exist for the regime
      }
    }

    return {
      ...sharedColumns,
      ...regimeColumns[regimeSlug]
    }
  }

  /**
   * Use to get a specific column's details
   *
   * Given a column name (as seen in the UI) and regime it will return its data-column name and TD nth-child position.
   * We can then use this to either grab a value or check for the existance of one.
   *
   * We need to know the regime because the transactions to be billed table is different for each one.
   *
   * If the a matching column is not found it will throw an error. This is intended to help highlight errors caused by
   * typos, for example, using wrong case quickly.
   */
  static columnPicker (columnName, regimeSlug) {
    const regimeColumns = this.columns(regimeSlug)

    if (columnName in regimeColumns) {
      return regimeColumns[columnName]
    }

    throw new Error(`Column '${columnName}' is unknown for ${regimeSlug}. Check your spelling and case!`)
  }
}

export default RetrospectiveTransactionsToBeBilledTable
