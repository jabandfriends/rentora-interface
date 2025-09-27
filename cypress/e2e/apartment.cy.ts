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

describe('View Overdue Invoice Dashboard', () => {
  it('should open overdue invoice dashboard', () => {
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
    cy.contains('Invoices').click()
    cy.contains('Overdue Invoices').click()
    cy.url().should('include', '/overdue-invoice')
    cy.get('[data-cy="sidebar-header-close"]').click()

    cy.contains('Overdue Invoices').should('exist')
    cy.contains(
      'Manage unpaid bills and outstanding invoices. Track due dates and make quick payments in one place.',
    ).should('exist')
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

describe('View Rooms Report Dashboard', () => {
  it('should open rooms report dashboard', () => {
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
    cy.contains('Reports').click()
    cy.contains('Room Report').click()
    cy.url().should('include', '/report/room')
    cy.get('[data-cy="sidebar-header-close"]').click()

    cy.contains('Room Report').should('exist')
    cy.contains('Manage and view all room').should('exist')
  })
})

describe('View Receipt Report Dashboard', () => {
  it('should open receipt report dashboard', () => {
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
    cy.contains('Reports').click()
    cy.contains('Receipt Report').click()
    cy.url().should('include', '/report/receipt')
    cy.get('[data-cy="sidebar-header-close"]').click()

    cy.contains('Receipt Report').should('exist')
    cy.contains('Manage and view all customer receipt').should('exist')
  })
})

describe('View Electric & Water Report Dashboard', () => {
  it('should open electric & water report dashboard', () => {
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
    cy.contains('Reports').click()
    cy.contains('Electric & Water Report').click()
    cy.url().should('include', '/report/electric-water')
    cy.get('[data-cy="sidebar-header-close"]').click()

    cy.contains('Electric & Water Usage').should('exist')
    cy.contains('Manage and view electric & water usage and bills').should('exist')
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
