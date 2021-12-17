import axe from 'axe-core';

describe('Index page', () => {
  it('opens', () => {
    cy.visit('/');
  });

  it('contains header', () => {
    cy.visit('/');
    cy.get('header').should('be.visible').should('contain', 'ToDo');
  });

  it('contains a hero block with screenshot', () => {
    cy.visit('/');
    cy.get('main').within(() => {
      cy.contains('Organize it all');
      cy.root().find('img').should('have.attr', 'src').should('include', 'screenshot.png');
    });
  });

  describe('when not authenticated', () => {
    it('header contains Sign Up and Log In buttons', () => {
      cy.visit('/');
      cy.get('header').within(() => {
        cy.root().should('be.visible');
        cy.contains('a', 'Sign Up');
        cy.contains('a', 'Log In');
      });
    });

    it('hero block contains Sign Up and Log In buttons', () => {
      cy.visit('/');
      cy.get('main').within(() => {
        cy.root().should('be.visible');
        cy.contains('a', 'Sign Up');
        cy.contains('a', 'Log In');
      });
    });
  });

  describe('when authenticated', () => {
    let user: SignUpDto;

    before(() => {
      cy.clearLocalStorageSnapshot();
      cy.fixture('user').then((data) => {
        user = data;
        cy.authenticate(user)
          .its('access_token')
          .then((token: string) => {
            cy.setLocalStorage('access_token', token);
            cy.saveLocalStorage();
          });
      });
    });

    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });

    after(() => {
      cy.clearLocalStorageSnapshot();
    });

    it('header contains profile button', () => {
      cy.visit('/');
      cy.get('header').within(() => {
        cy.root().should('be.visible');
        cy.contains('button', user.name);
      });
    });

    it('hero block contains Launch button', () => {
      cy.visit('/');
      cy.get('main').within(() => {
        cy.root().should('be.visible');
        cy.contains('a', 'Launch');
      });
    });
  });

  it('passes a11y test', () => {
    cy.visit('/');
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
