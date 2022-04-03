Feature: Exclusions

  Background:
    Given I am starting with known pas data
    And I sign in as the 'installations' user

  Scenario: Exclude and reinstate transaction
    When I exclude the first transaction
    Then I see confirmation the transaction has been updated
    And I see the transaction struck through in transactions to be billed
    Then if I reinstate the transaction
    Then I see confirmation the transaction has been updated
    And I no longer see the transaction struck through in transactions to be billed
