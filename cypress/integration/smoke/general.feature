Feature: Smoke test

  Background:
    Given I sign in as the 'admin' user

  Scenario: Page checks (CFD)
    When I select the 'Water Quality' regime
    Then I see the Transactions to be billed page
    And I select 'Transactions to be billed' from the Transactions menu
    Then I see the Transactions to be billed page
    And I select 'Transaction History' from the Transactions menu
    Then I see the Transaction History page
    And I select 'Pre-April 2018 Transactions to be billed' from the Transactions menu
    Then I see the Pre-April 2018 Transactions to be billed page
    And I select 'Excluded Transactions' from the Transactions menu
    Then I see the Excluded Transactions page
    And I select 'Imported Transaction Files' from the Transactions menu
    Then I see the Imported Transaction Files page
    And I select 'Transaction File History' from the Transactions menu
    Then I see the Transaction File History page
    And I select 'Download Transaction Data' from the Transactions menu
    Then I see the Download Transaction Data page
    And I select 'Permit Categories' from the Admin menu
    Then I see the Permit Categories page
    And I select 'Exclusion Reasons' from the Admin menu
    Then I see the Exclusion Reasons page
    And I select 'Review Annual Billing Data' from the Annual Billing menu
    Then I see the Annual Billing Data Files page

  Scenario: Page checks (PAS)
    When I select the 'Installations' regime
    Then I see the Transactions to be billed page
    And I select 'Transactions to be billed' from the Transactions menu
    Then I see the Transactions to be billed page
    And I select 'Transaction History' from the Transactions menu
    Then I see the Transaction History page
    And I select 'Pre-April 2018 Transactions to be billed' from the Transactions menu
    Then I see the Pre-April 2018 Transactions to be billed page
    And I select 'Excluded Transactions' from the Transactions menu
    Then I see the Excluded Transactions page
    And I select 'Imported Transaction Files' from the Transactions menu
    Then I see the Imported Transaction Files page
    And I select 'Transaction File History' from the Transactions menu
    Then I see the Transaction File History page
    And I select 'Download Transaction Data' from the Transactions menu
    Then I see the Download Transaction Data page
    And I select 'Permit Categories' from the Admin menu
    Then I see the Permit Categories page
    And I select 'Exclusion Reasons' from the Admin menu
    Then I see the Exclusion Reasons page
    And I select 'Review Annual Billing Data' from the Annual Billing menu
    Then I see the Annual Billing Data Files page

  Scenario: Page checks (WML)
    When I select the 'Waste' regime
    Then I see the Transactions to be billed page
    And I select 'Transactions to be billed' from the Transactions menu
    Then I see the Transactions to be billed page
    And I select 'Transaction History' from the Transactions menu
    Then I see the Transaction History page
    And I select 'Excluded Transactions' from the Transactions menu
    Then I see the Excluded Transactions page
    And I select 'Imported Transaction Files' from the Transactions menu
    Then I see the Imported Transaction Files page
    And I select 'Transaction File History' from the Transactions menu
    Then I see the Transaction File History page
    And I select 'Download Transaction Data' from the Transactions menu
    Then I see the Download Transaction Data page
    And I select 'Permit Categories' from the Admin menu
    Then I see the Permit Categories page
    And I select 'Exclusion Reasons' from the Admin menu
    Then I see the Exclusion Reasons page
    And I select 'Permit Categories' from the Admin menu
    Then I see the Permit Categories page
    And I select 'Review Annual Billing Data' from the Annual Billing menu
    Then I see the Annual Billing Data Files page

  Scenario: Page checks (Users)
    And from the Admin menu I select User Management
    Then I see the Users page
    And from the User menu I select Change Password
    Then I see the Change Password page
    When I sign out
    Then I see the Sign in page
    When I click the Forgot your password link
    Then I see the Forgot your password page
    When I click the resend unlock instructions link
    Then I see the Resend unlock instructions page
