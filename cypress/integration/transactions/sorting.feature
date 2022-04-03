Feature: Sorting of columns

  Scenario: Sorting columns for CFD
    Given I am starting with known cfd data
    When I sign in as the admin user
    Then I am on the Transactions to be Billed page
    And I select the 'Water Quality' regime
    # File Reference
    When I sort by 'File Reference' in ascending order
    Then I see 'CFDAI00394' as the first 'File Reference'
    When I sort by 'File Reference' in descending order
    Then I see 'CFDAI00394' as the first 'File Reference'
    # File Date
    When I sort by 'File Date' in ascending order
    Then I see '23/08/19' as the first 'File Date'
    When I sort by 'File Date' in descending order
    Then I see '23/08/19' as the first 'File Date'
    # Customer
    When I sort by 'Customer' in ascending order
    Then I see 'A61000001C' as the first 'Customer'
    When I sort by 'Customer' in descending order
    Then I see 'A61000010C' as the first 'Customer'
    # Consent
    When I sort by 'Consent' in ascending order
    Then I see 'GWIJK/12345/1/1' as the first 'Consent'
    When I sort by 'Consent' in descending order
    Then I see 'PRZAB/12345/1/1' as the first 'Consent'
    # %
    When I sort by '%' in ascending order
    Then I see '100' as the first '%'
    When I sort by '%' in descending order
    Then I see '100' as the first '%'
    # Period
    When I sort by 'Period' in ascending order
    Then I see '01/04/18 - 31/03/19' as the first 'Period'
    When I sort by 'Period' in descending order
    Then I see '01/04/19 - 31/03/20' as the first 'Period'
    # Category
    When I sort by 'Category' in ascending order
    When I sort by 'Category' in descending order

  Scenario: Sorting columns for PAS
    Given I am starting with known pas data
    When I sign in as the admin user
    Then I am on the Transactions to be Billed page
    And I select the 'Installations' regime
    # File Reference
    When I sort by 'File Reference' in ascending order
    Then I see 'PASAI00394' as the first 'File Reference'
    When I sort by 'File Reference' in descending order
    Then I see 'PASAI00394' as the first 'File Reference'
    # File Date
    When I sort by 'File Date' in ascending order
    Then I see '20/08/21' as the first 'File Date'
    When I sort by 'File Date' in descending order
    Then I see '20/08/21' as the first 'File Date'
    # Customer
    When I sort by 'Customer' in ascending order
    Then I see 'A86000001P' as the first 'Customer'
    When I sort by 'Customer' in descending order
    Then I see 'A88000001P' as the first 'Customer'
    # Permit
    When I sort by 'Permit' in ascending order
    Then I see 'PS0000JQ' as the first 'Permit'
    When I sort by 'Permit' in descending order
    Then I see 'PS0000AA' as the first 'Permit'
    # Original Permit
    When I sort by 'Original Permit' in ascending order
    Then I see 'ZT1010EF' as the first 'Original Permit'
    When I sort by 'Original Permit' in descending order
    Then I see 'ZT1010AA' as the first 'Original Permit'
    # Band
    When I sort by 'Band' in ascending order
    Then I see 'B' as the first 'Band'
    When I sort by 'Band' in descending order
    Then I see 'C' as the first 'Band'
    # Period
    When I sort by 'Period' in ascending order
    Then I see '01/04/18 - 31/03/19' as the first 'Period'
    When I sort by 'Period' in descending order
    Then I see '01/04/21 - 31/03/22' as the first 'Period'
    # Category
    When I sort by 'Category' in ascending order
    When I sort by 'Category' in descending order

  Scenario: Sorting columns for WML
    Given I am starting with known wml data
    When I sign in as the admin user
    Then I am on the Transactions to be Billed page
    And I select the 'Waste' regime
    # File Reference
    When I sort by 'File Reference' in ascending order
    Then I see 'WMLAI00394' as the first 'File Reference'
    When I sort by 'File Reference' in descending order
    Then I see 'WMLAI00394' as the first 'File Reference'
    # File Date
    When I sort by 'File Date' in ascending order
    Then I see '30/07/21' as the first 'File Date'
    When I sort by 'File Date' in descending order
    Then I see '30/07/21' as the first 'File Date'
    # Customer
    When I sort by 'Customer' in ascending order
    Then I see 'Y02000001J' as the first 'Customer'
    When I sort by 'Customer' in descending order
    Then I see 'Y02000004J' as the first 'Customer'
    # Permit
    When I sort by 'Permit' in ascending order
    Then I see '11297' as the first 'Permit'
    When I sort by 'Permit' in descending order
    Then I see '96198' as the first 'Permit'
    # Band
    When I sort by 'Band' in ascending order
    Then I see 'A' as the first 'Band'
    When I sort by 'Band' in descending order
    Then I see 'B' as the first 'Band'
    # Period
    When I sort by 'Period' in ascending order
    Then I see '01/04/21 - 31/03/22' as the first 'Period'
    When I sort by 'Period' in descending order
    Then I see '13/07/21 - 31/03/22' as the first 'Period'
    # Category
    When I sort by 'Category' in ascending order
    When I sort by 'Category' in descending order
