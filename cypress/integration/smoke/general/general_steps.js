import { And, Then, When } from 'cypress-cucumber-preprocessor/steps'

import MainMenu from '../../../pages/menus/main_menu'

import AnnualBillingPage from '../../../pages/annual_billing_page'
import ChangePasswordPage from '../../../pages/change_password_page'
import ExcludedTransactionsPage from '../../../pages/excluded_transactions_page'
import ExclusionReasonsPage from '../../../pages/exclusion_reasons_page'
import ExportDataPage from '../../../pages/export_data_page'
import ForgotPasswordPage from '../../../pages/forgot_password_page'
import ImportedTransactionFilesPage from '../../../pages/imported_transaction_files_page'
import PermitCategoriesPage from '../../../pages/permit_categories_page'
import ResendUnlockPage from '../../../pages/resend_unlock_page'
import RetrospectiveTransactionsPage from '../../../pages/retrospective_transactions_page'
import SignInPage from '../../../pages/sign_in_page'
import TransactionFileHistoryPage from '../../../pages/transaction_file_history_page'
import TransactionsPage from '../../../pages/transactions_page'
import TransactionHistoryPage from '../../../pages/transaction_history_page'
import UsersPage from '../../../pages/users_page'

And('I select {string} from the Transactions menu', (optionText) => {
  cy.get('@regime').then((regime) => {
    MainMenu.transactions.getOption(optionText, regime.slug).click()
  })
})

And('I select {string} from the Admin menu', (optionText) => {
  cy.get('@regime').then((regime) => {
    MainMenu.admin.getOption(optionText, regime.slug).click()
  })
})

And('I select {string} from the Annual Billing menu', (optionText) => {
  cy.get('@regime').then((regime) => {
    MainMenu.annualBilling.getOption(optionText, regime.slug).click()
  })
})

And('from the Admin menu I select User Management', () => {
  MainMenu.admin.getOption('User Management', '').click()
})

And('from the User menu I select Change Password', () => {
  MainMenu.user.getOption('Change Password').click()
})

When('I sign out', () => {
  cy.signOut()
})

When('I click the Forgot your password link', () => {
  SignInPage.forgotPasswordLink().click()
})

When('I click the resend unlock instructions link', () => {
  SignInPage.resendUnlockLink().click()
})

Then('I see the Transactions to be billed page', () => {
  TransactionsPage.confirm()
})

Then('I see the Transaction History page', () => {
  TransactionHistoryPage.confirm()
})

Then('I see the Pre-April 2018 Transactions to be billed page', () => {
  RetrospectiveTransactionsPage.confirm()
})

Then('I see the Excluded Transactions page', () => {
  ExcludedTransactionsPage.confirm()
})

Then('I see the Imported Transaction Files page', () => {
  ImportedTransactionFilesPage.confirm()
})

Then('I see the Transaction File History page', () => {
  TransactionFileHistoryPage.confirm()
})

Then('I see the Download Transaction Data page', () => {
  ExportDataPage.confirm()
})

Then('I see the Permit Categories page', () => {
  PermitCategoriesPage.confirm()
})

Then('I see the Exclusion Reasons page', () => {
  ExclusionReasonsPage.confirm()
})

Then('I see the Annual Billing Data Files page', () => {
  AnnualBillingPage.confirm()
})

Then('I see the Users page', () => {
  UsersPage.confirm()
})

Then('I see the Change Password page', () => {
  ChangePasswordPage.confirm()
})

Then('I see the Sign in page', () => {
  SignInPage.confirm()
})

Then('I see the Forgot your password page', () => {
  ForgotPasswordPage.confirm()
})

Then('I see the Resend unlock instructions page', () => {
  ResendUnlockPage.confirm()
})
