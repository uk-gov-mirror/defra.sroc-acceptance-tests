Feature: Data Export

  Background:
    Given I sign in as the 'admin' user

  Scenario: Download transaction data
    When I select the 'Installations' regime
    And I proceed to view file download details
    Then I can view the Data Protection Notice
    And I can download transaction data
