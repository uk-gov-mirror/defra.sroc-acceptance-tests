Feature: Review Annual Billing

  Background:
   Given I sign in as the 'admin' user
    When I select the 'Waste' regime
     And I proceed to review Annual Billing details

  Scenario: Review Annual Billing
    Then I can view a list of Annual Billing Data Files 


  Scenario: Review Annual Billing File Details
     And I can view a list of Annual Billing Data Files
     And I select an Annual Billing File to review
    Then I can view the details of the selected Annual Billing File

  Scenario: Navigate back to Review Annual Billing
     And I can view a list of Annual Billing Data Files
     And I select an Annual Billing File to review
    Then I can navigate back to Review Annual Billing

