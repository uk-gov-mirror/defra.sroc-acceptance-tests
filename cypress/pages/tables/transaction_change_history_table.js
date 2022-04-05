import BaseTable from './base_table'

class TransactionChangeHistoryTable extends BaseTable {
  static cell (rowNumber, columnName) {
    const column = this.columnPicker(columnName)

    return cy.get(`.table-responsive tr:nth-child(${rowNumber + 1}) td:nth-child(${column.index})`)
  }

  static cells (columnName) {
    const column = this.columnPicker(columnName)

    return cy.get(`.table-responsive tr td:nth-child(${column.index})`)
  }

  // Support

  static columns () {
    return {
      Event: { index: 1 },
      When: { index: 2 },
      Who: { index: 3 }
    }
  }

  static columnPicker (columnName) {
    const columns = this.columns()

    if (columnName in columns) {
      return columns[columnName]
    }

    throw new Error(`Column '${columnName}' is unknown. Check your spelling and case!`)
  }
}

export default TransactionChangeHistoryTable
