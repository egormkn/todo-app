describe('Authentication', () => {
  it('Visits the login page', () => {
    cy.visit('/auth/login');
  });

  it('Submits the login form', () => {
    const { baseUrl } = Cypress.config();
    cy.visit('/auth/login');
    cy.get('input[name=username]').type('test');
    cy.get('input[name=password]').type('password');
    cy.get('form button[type=submit]').click();
    cy.get('form').contains('The user does not exist');
    cy.url().should('be.a', baseUrl);
  });
});
