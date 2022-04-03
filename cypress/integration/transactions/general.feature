Feature: Transactions

  Background:
    Given I am starting with known wml data
    And I sign in as the 'waste' user

  Scenario: Search for customer
    When I search for the customer 'Y02000001J'
    Then I see only results for customer 'Y02000001J'
