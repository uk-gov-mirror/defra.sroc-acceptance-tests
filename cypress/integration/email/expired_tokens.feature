Feature: Expired Tokens

  Scenario: Expired invite email
    Given I am a new user
    When a new account is created for me
    But I miss the first invitation email
    And request another invitation email
    Then the TCM will confirm the user has been reinvited
    And I try to accept the first invitation email
    Then the TCM will confuse me and not be helpful

  Scenario: Expired reset password email
    Given I am an existing user
    And I have forgotten my password
    But I miss the first reset password email
    And request another reset password email
    When I try to accept the first reset password email
    Then I will be told my token is invalid

  Scenario: Expired unlock email
    Given I am an existing user
    And I incorrectly enter my password 5 times
    But I miss the first unlock email
    And request another unlock email
    Then I will see confirmation an unlock email has been sent
    And I try to accept the first unlock email
    Then I will be directed to the resend unlock page and told my token is invalid
