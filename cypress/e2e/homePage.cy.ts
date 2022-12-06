describe('Check components for HomePage, step 1', () => {
  it('Connect', () => {
    cy.visit('http://localhost:3000/');
    cy.wait(1000);
  });

  it('Check good number of text for HomePage', () => {
    cy.visit('http://localhost:3000/');
    cy.get('textarea').should('have.length', '2');
  });

  it('Check good title for HomePage', () => {
    cy.visit('http://localhost:3000/');
    cy.contains("#marketplace-app-homePage-title");
  });

  it('Check good sub-title for HomePage', () => {
    cy.visit('http://localhost:3000/');
    cy.contains("marketplace-app-homePage-subTitle");
  });
});