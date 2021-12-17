import axe from 'axe-core';

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

  it('passes a11y test', () => {
    cy.visit('/auth/login');
    cy.injectAxe();

    const violationCallback = (violations: axe.Result[]) => {
      cy.task(
        'log',
        `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${
          violations.length === 1 ? 'was' : 'were'
        } detected`,
      );
      // pluck specific keys to keep the table readable
      const violationData = violations.map(({ id, impact, description, nodes }) => ({
        id,
        impact,
        description,
        nodes: nodes.length,
      }));

      cy.task('table', violationData);
    };

    cy.checkA11y(undefined, undefined, violationCallback, true);
  });
});
