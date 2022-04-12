Feature: Validation

    Background: Authenticate
        Given I sign in as the 'admin' user
    
    Scenario: Permit Category Code must be in dotted numeric format
        When I attempt to create a permit category with an invalid code
        Then I am told the code must be in dotted numeric format
    
    Scenario: Permit Category Code cannot be blank
        When I attempt to create a permit category with a blank code
        Then I am told the code cannot be blank

    Scenario Outline: Permit Category Description must not include special characters
        When I attempt to create a permit category with "<invalidCharacter>"
        Then I am told these characters are not permitted
          Examples:
          | invalidCharacter |
          | ?                |
          | ^                |
          | £                |
          | ≤                |
          | ≥                |
          | —                |

    
    Scenario: Permit Category Description cannot be blank
        When I attempt to create a permit category with a blank description
        Then I am told the description cannot be blank
