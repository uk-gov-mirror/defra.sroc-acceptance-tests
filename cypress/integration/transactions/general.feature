Feature: Transactions

  Background:
    Given I am starting with known wml data
    And I sign in as the 'waste' user

  Scenario: Search for customer
    When I search for the customer 'Y02000001J'
    Then I see only results for customer 'Y02000001J'

  Scenario: Transaction details
    When I select the first transaction
    Then I see the detail, suggested category and related transactions sections
