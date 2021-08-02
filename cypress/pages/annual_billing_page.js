class AnnualBillingPage {
 
    static mainHeading () {
      return cy.get('h1')
    }
  
    static dataFilesTable () {
      return cy.get('.table')
    }

    static fileNameLink () {
        return cy.get('.table > tbody > tr > td > [href="/regimes/wml/annual_billing_data_files/48"]')
      }
  
  }
  
  export default AnnualBillingPage
  