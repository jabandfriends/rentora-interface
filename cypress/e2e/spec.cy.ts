describe('template spec', () => {
  it('visits the example page', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type').should('exist') // example assertion
  })
})
