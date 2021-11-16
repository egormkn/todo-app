describe('Login page', () => {
  it('opens', () => {
    cy.visit('/auth/login');
  });

  it('shows error message when user does not exist', () => {
    cy.visit('/auth/login');
    cy.get('form').within(() => {
      const username = 'doesnotexist';
      const password = 'doesnotexist';
      cy.get('input[name=username]').type(username);
      cy.get('input[name=password]').type(password);
      cy.get('button[type=submit]').click();
      cy.root().contains(`User "${username}" was not found`);
    });
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
      cy.get('form').within(() => {
        cy.get('input[name=username]').type(user.username);
        cy.get('input[name=password]').type(user.password);
        cy.get('button[type=submit]').click();
        cy.location('pathname').should('eq', '/');
      });
    });
  });
});
