Feature: Export matching entries

  As a user of the system
  I need to be able to export the filtered results the TCM returns
  So that I can check and process them offline

  Background:
    Given I sign in as the 'installations' user

  Scenario: Displays data protection notice when exporting
    When I select 'Transactions to be billed' from the Transactions menu
    And I click the export button
    Then the data protection notice modal is displayed
    When I select 'Transaction History' from the Transactions menu
    And I click the export button
    Then the data protection notice modal is displayed
    When I select 'Pre-April 2018 Transactions to be billed' from the Transactions menu
    And I click the export button
    Then the data protection notice modal is displayed
    When I select 'Excluded Transactions' from the Transactions menu
    And I click the export button
    Then the data protection notice modal is displayed
