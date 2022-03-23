Feature: Email Resending

  Scenario: Resend invite email
    Given I am a new user
    When a new account is created for me
    But I miss the first invitation email
    And request another invitation email
    Then the TCM will confirm the user has been reinvited
    And I accept the invitation
    Then I will be signed in with my new account

  Scenario: Resend unlock email
    Given I am an existing user
    And I incorrectly enter my password 5 times
    But I miss the first unlock email
    And request another unlock email
    Then I will see confirmation an unlock email has been sent
    When I follow the link to unlock my account
    Then I will see confirmation my account is unlocked
