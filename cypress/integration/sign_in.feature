Feature: Sign in

  Scenario: Visit sign in page
    Given I visit the sign in page
    Then I see 'Sign in' in the main heading

  Scenario: Log in to service
    Given I visit the sign in page
    When I enter my credentials
    Then I see 'Transactions to be billed' in the main heading
