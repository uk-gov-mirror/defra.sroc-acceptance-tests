Feature: Transactions

  Background:
    Given I sign in as the 'admin' user

  Scenario: Search for customer
    When I select the 'Water Quality' regime
    And I search for the customer 'A61000001C'
    Then I see only results for customer 'A61000001C'
