Feature: Transactions

  Background:
    Given I sign in as the 'system' user

  Scenario: Search for customer
    When I search for the customer 'A1234B'
    Then I see only results for customer 'A1234B'
