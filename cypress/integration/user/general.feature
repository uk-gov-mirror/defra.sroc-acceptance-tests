Feature: Update user account

    Background: Authenticate
        Given I sign in as the 'admin' user
        And I select a user

    Scenario: Update first name
        When I update the users first name
        Then I will see confirmation the user account is updated
         And I can confirm the users first name is updated

    Scenario: Update Last name
        When I update the users last name
        Then I will see confirmation the user account is updated
        And I can confirm the users last name is updated

    Scenario Outline: Update Regime Access
        When I update the users regime access to "<regime>"
        Then I will see confirmation the user account is updated
        And I can confirm the users regime access is updated to "<regime>"
        Examples:
            | regime        |
            | Installations |
            | Waste         |
            | Water Quality |  