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
    cy.contains('Organize it all');
    cy.get('main').find('img').should('have.attr', 'src').should('include', 'screenshot.png');
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
    let name: string;

    before(() => {
      console.log('BEFORE');
      name = 'Test';
    });

    it('header contains profile button', () => {
      cy.visit('/');
      cy.get('header').within(() => {
        cy.root().should('be.visible');
        cy.contains('a', name);
      });
    });

    after(() => {
      console.log('AFTER');
    });
  });
});
