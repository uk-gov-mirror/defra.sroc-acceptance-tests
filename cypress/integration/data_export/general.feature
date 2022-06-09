Feature: Data Export

  Background:
    Given I am starting with known data
    And I sign in as the 'admin' user

  Scenario: No transaction file has been generated
    When I select the 'Installations' regime
    And I proceed to view the file download details
    Then I can view the Data Protection Notice
    And I am told that the transaction data file has not yet been generated
    And I cannot download transaction data

  Scenario: Download transaction data
    When I run the generate data job
    And return to the home page
    When I select the 'Installations' regime
    And I proceed to view the file download details
    Then I can download transaction data file
    And the transaction data file exists
