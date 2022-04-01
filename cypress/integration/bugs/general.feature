Feature: Bugs

  As the technical team
  I need to replicate bugs
  So that I can investigate what is causing them

  Background:
    Given I am starting with known pas data

  Scenario: Sticky search value between pages
    When I sign in as the admin user
    Then I will be on the Transactions to be billed page
    And I select the 'Installations' regime
    And I search for permit reference PS0000JQ
    And I see results
    Then I select 'Pre-April 2018 Transactions to be billed' from the transactions menu
    And I do not see results
    But if I clear the search field and search again
    Then I see results

  Scenario: Broken pre-April 2018 generate file
    When I sign in as the admin user
    Then I will be on the Transactions to be billed page
    And I select the 'Installations' regime
    Then I select 'Transaction File History' from the transactions menu
    And I set pre post-sroc to Post
    Then I select 'Pre-April 2018 Transactions to be billed' from the transactions menu
    And I see results
    When I view the generate pre-sroc transaction file summary
    Then it will not let me generate the file
