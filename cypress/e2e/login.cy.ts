// As a user, I want to log in so I can access the dashboard.
describe('Login and access dashboard', () => {
  it('should login successfully', () => {
    // Open login page
    cy.visit('/authentication')

    // Type email and password
    cy.get('[name="email"]').type('admin@example.com')
    cy.get('[name="password"]').type('admin123')

    // Click login button
    cy.get('[type="submit"]').click()

    //click view all apartments
    cy.get('button').contains('View').click()
    cy.url().should('include', '/dashboard')
  })
})
