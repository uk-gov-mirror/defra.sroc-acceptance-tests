Feature: Read Export Files

  Scenario: Read export file
    When I read the export file 'wrls/transaction/nalwi50001.dat'
    Then row 0 column 0 equals 'H'
    Then row 1 column 1 equals '0000001'
    Then column 2 contains 'A51541393A'