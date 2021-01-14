Feature: Authorisation

  As the business responsible for the system
  I want to ensure
  That users can only access the features and regimes they are permitted to

  Scenario: Admin role
    Given I sign in as the 'admin' user
    When I see the transactions page
    Then I should see the admin menu

  Scenario: Billing role
    Given I sign in as the 'billing' user
    When I see the transactions page
    Then I should see the billing menu
    But I should not see the admin menu

  Scenario: Export role
    Given I sign in as the 'export' user
    When I see the transactions page
    Then I should see the transactions menu
    And I should see download transactions
    But I should not see the admin menu
    But I should not see the billing menu

  Scenario: Readonly role
    Given I sign in as the 'readonly' user
    When I see the transactions page
    Then I should see the transactions menu
    But I should not see download transactions
    But I should not see the admin menu
    But I should not see the billing menu

  Scenario Outline: Regimes
    Given I sign in as the "<regime>" user
    When I see the transactions page
    Then I should only see the "<regime>" regime
    Examples:
      | regime        |
      | installations |
      | waste         |
      | water         |
