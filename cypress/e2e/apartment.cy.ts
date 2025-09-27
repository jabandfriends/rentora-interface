//As a user, I want to see all apartments after login
describe('View All Apartments', () => {
  it('should open all apartments', () => {
    // Open login page
    cy.visit('/authentication')

    // Type email and password
    cy.get('[name="email"]').type('admin@example.com')
    cy.get('[name="password"]').type('admin123')

    // Click login button
    cy.get('[type="submit"]').click()

    // Check if redirected to dashboard
    cy.url().should('include', '/')

    // Optional: check if dashboard has welcome text
    cy.contains('All Apartments').should('exist')
    cy.get('h4').should('have.length.greaterThan', 0)
  })
})

//As a user, I want to see the status of an apartment after login
describe('Apartment Status', () => {
  it('should display correct status', () => {
    cy.visit('/authentication')
    // Type email and password
    cy.get('[name="email"]').type('admin@example.com')
    cy.get('[name="password"]').type('admin123')

    // Click login button
    cy.get('[type="submit"]').click()
    cy.get('h4')
      .first()
      .parents('.w-full.space-y-1')
      .within(() => {
        cy.contains('Active').should('exist') // or 'Inactive', 'Setup In Progress'
      })
  })
})

//As a user, I want to see tenants dashboard
describe('View Tenant Dashboard', () => {
  it('should open tenants dashboard', () => {
    // Open login page
    cy.visit('/authentication')

    // Type email and password
    cy.get('[name="email"]').type('admin@example.com')
    cy.get('[name="password"]').type('admin123')

    // Click login button
    cy.get('[type="submit"]').click()

    // Check if redirected to dashboard
    cy.url().should('include', '/')

    cy.get('button').contains('View').click()

    cy.get('[name="sidebarToggle"]').click()
    cy.contains('Tenants Management').click()
    cy.url().should('include', '/tenant')
    cy.get('[data-cy="sidebar-header-close"]').click()

    cy.contains('Manage and view all tenants').should('exist')
  })
})

describe('View All Rooms Dashboard', () => {
  it('should open all rooms dashboard', () => {
    // Open login page
    cy.visit('/authentication')

    // Type email and password
    cy.get('[name="email"]').type('admin@example.com')
    cy.get('[name="password"]').type('admin123')

    // Click login button
    cy.get('[type="submit"]').click()

    // Check if redirected to dashboard
    cy.url().should('include', '/')

    cy.get('button').contains('View').click()

    cy.get('[name="sidebarToggle"]').click()
    cy.contains('All Rooms').click()
    cy.url().should('include', '/all-room')
    cy.get('[data-cy="sidebar-header-close"]').click()

    cy.contains('All Rooms').should('exist')
    cy.contains('All rooms with category dashboard').should('exist')
  })
})

describe('View Maintenance Dashboard', () => {
  it('should open maintenance dashboard', () => {
    // Open login page
    cy.visit('/authentication')

    // Type email and password
    cy.get('[name="email"]').type('admin@example.com')
    cy.get('[name="password"]').type('admin123')

    // Click login button
    cy.get('[type="submit"]').click()

    // Check if redirected to dashboard
    cy.url().should('include', '/')

    cy.get('button').contains('View').click()

    cy.get('[name="sidebarToggle"]').click()
    cy.contains('Maintenance').click()
    cy.url().should('include', '/maintenance')
    cy.get('[data-cy="sidebar-header-close"]').click()

    cy.contains('Maintenance').should('exist')
    cy.contains('Manage maintenance reports').should('exist')
  })
})
