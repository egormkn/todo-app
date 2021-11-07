describe('Login page', () => {
  it('opens', () => {
    cy.visit('/auth/login');
  });

  it('shows error message when user does not exist', () => {
    cy.visit('/auth/login');
    cy.get('input[name=username]').type('doesnotexist');
    cy.get('input[name=password]').type('doesnotexist');
    cy.get('form button[type=submit]').click();
    cy.get('form').contains('The user does not exist');
  });

  describe('when user exists', () => {
    let user: SignUpDto;

    before(() => {
      cy.fixture('user').then((data) => {
        user = data;
        return cy.authenticate(user);
      });
    });

    it('allows user to log in', () => {
      cy.visit('/auth/login');
      cy.get('input[name=username]').type(user.username);
      cy.get('input[name=password]').type(user.password);
      cy.get('form button[type=submit]').click();
      cy.location('pathname').should('eq', '/');
    });
  });
});
