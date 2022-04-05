Feature: Transaction history

  Background:
    Given I am starting with known cfd data
    And I sign in as the 'water' user

  Scenario: View import, temporary cessation and exclusion history
    When I set the temporary cessation flag for the first transaction
    Then exclude the first transaction
    When I view the transaction change history
    Then I will see Temporary Cessation is Yes
    And I will see it has a status of To be billed and Marked for Exclusion
    And I will see a record of its import
    And I will see a record of its cessation
    And I will see a record of its exclusion
