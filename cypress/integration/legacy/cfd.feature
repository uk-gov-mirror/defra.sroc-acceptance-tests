Feature: CFD (Water Quality) Legacy

  Background:
    Given I sign in as the admin user

  Scenario: Legacy test
    Then the user menu is visible
    And the main heading is 'Transactions to be billed'
    And the user menu says I am signed in as 'Admin User'
    And I select 'Water Quality' from the Regime menu
    And I select 'Imported Transaction Files' from the Transactions menu
    And the main heading is 'Imported Transaction Files'
    And the first record has file reference 'CFDAI00394'
    And I select 'Transactions to be billed' from the Transactions menu
    And the main heading is 'Transactions to be billed'
    And I log the number of transactions displayed
    # If the TCM had no transactions the legacy test would then skip approx 600 lines of testing!
    # We've assumed we'll always be running this against an environment that at least has our basic test data. We will
    # always attempt to run the following steps.
    And I log which region is selected in the search bar
    And I select All for financial year in the search bar
    And I select 50 for items per page in the paging info bar
    And I see the 'Ver' column is displayed
    And I see the 'Dis' column is displayed
    Then I open the transaction detail page for the first transaction
    And the main heading is 'Transaction detail'
    And the sub heading 'Suggested category' is visible
    And the sub heading 'Related unbilled transactions' is visible
    Then I go back using the link
    Then I go back using the link
    Then I go back using the link
    Then I copy the consent reference from the first transaction
    And search transactions with it
    And all transactions displayed have the same consent reference
    Then I select a category for each transaction
    And the transaction categories will be set
    And the transaction charges will be set
    And approve the transactions for billing
    And generate the transaction file
    Then I see confirmation the transaction file is queued for export
    And I log the transaction filename to prove it can be used in another step
    And there are no transactions to be billed displayed anymore
    And I select 'Transaction File History' from the Transactions menu
    And the main heading is 'Transaction File History'
    And I set region to A
    And I set pre post-sroc to Post
    And I select 'Excluded Transactions' from the Transactions menu
    And the main heading is 'Excluded Transactions'
    And I select 'Transaction History' from the Transactions menu
    And the main heading is 'Transaction History'
    Then I set view to 'Pre-April 2018 Transactions to be billed'
    And the main heading is 'Pre-April 2018 Transactions to be billed'
    # At this point in the legacy tests we set the region, clear the search field and then hit search. But with an
    # automates test this does nothing. Region A is already selected and the search field is already empty. So, clicking
    # search is the equivalent of just doing a page refresh. So, we've omitted the clear and search but left the region
    # selection for kicks!
    And I set retrospectives region to A
    And I grab the first record and confirm its period is pre-April 2018
    Then I generate the pre-sroc transaction file
    Then I see confirmation the transaction file is queued for export
