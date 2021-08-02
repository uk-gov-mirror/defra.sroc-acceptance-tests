class ExportDataPage {
    static mainHeading () {
      return cy.get('h1')
    }
  
    static dataProtectionNotice () {
      return cy.get('h5')
    }
  
    static downloadBtn () {
      return cy.get('.btn.btn-primary')
    }
   
  }
  
  export default ExportDataPage
  