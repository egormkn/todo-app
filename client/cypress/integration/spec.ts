describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/auth/login');
    cy.contains('Log In with');
  });
});
