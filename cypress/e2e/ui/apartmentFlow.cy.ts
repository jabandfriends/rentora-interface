describe('Rentora View Apartment', () => {
  beforeEach(() => {
    cy.session('adminLogin', () => {
      cy.visit(`${Cypress.env('uiBaseUrl')}/authentication`)

      cy.get('input[name="email"]').type('admin@example.com', { force: true })
      cy.get('input[name="password"]').type('admin123', { force: true })
      cy.get('button[type="submit"]').click()

      cy.url().should('not.include', '/authentication')
    })
  })

  it('should redirect to dashboard after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.url().should('include', '/')
  })

  it('should show All Apartments page after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.contains('All Apartments', { timeout: 2000 }).should('be.visible')
  })
})

describe('Rentora View Dashboard', () => {
  beforeEach(() => {
    cy.session('adminLogin', () => {
      cy.visit(`${Cypress.env('uiBaseUrl')}/authentication`)

      cy.get('input[name="email"]').type('admin@example.com', { force: true })
      cy.get('input[name="password"]').type('admin123', { force: true })
      cy.get('button[type="submit"]').click()

      cy.url().should('not.include', '/authentication')
    })
  })

  it('should redirect to dashboard after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.url().should('include', '/')
  })

  it('should show All Apartments page after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.contains('All Apartments', { timeout: 2000 }).should('be.visible')
  })
  it('should click the "View" button for an active apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 1000 }).should('be.visible')

    // Find the first button with text "View" and click it
    cy.contains('button', 'View', { timeout: 1000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')
  })
})

describe('Rentora View Invoices', () => {
  beforeEach(() => {
    cy.session('adminLogin', () => {
      cy.visit(`${Cypress.env('uiBaseUrl')}/authentication`)

      cy.get('input[name="email"]').type('admin@example.com', { force: true })
      cy.get('input[name="password"]').type('admin123', { force: true })
      cy.get('button[type="submit"]').click()

      cy.url().should('not.include', '/authentication')
    })
  })

  it('should redirect to dashboard after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.url().should('include', '/')
  })

  it('should show All Apartments page after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.contains('All Apartments', { timeout: 2000 }).should('be.visible')
  })
  it('should click the "View" button for an active apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 1000 }).should('be.visible')

    // Find the first button with text "View" and click it
    cy.contains('button', 'View', { timeout: 1000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')
  })

  it('should click sidebar item to go to the "Normal Invoice" page for an apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 5000 }).should('be.visible')

    // Click the first "View" button for an active apartment
    cy.contains('button', 'View', { timeout: 5000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')

    // Click the "Invoices" button using data-testid
    cy.contains('Invoices', { timeout: 5000 }).should('not.be.disabled').click()
    cy.contains('Normal Invoices', { timeout: 5000 }).should('not.be.disabled').click()

    cy.url({ timeout: 5000 }).should('include', '/normal-invoice')
    cy.contains('Invoices Management', { timeout: 5000 }).should('be.visible')
  })
})

describe('Rentora View Monthly Invoices', () => {
  beforeEach(() => {
    cy.session('adminLogin', () => {
      cy.visit(`${Cypress.env('uiBaseUrl')}/authentication`)

      cy.get('input[name="email"]').type('admin@example.com', { force: true })
      cy.get('input[name="password"]').type('admin123', { force: true })
      cy.get('button[type="submit"]').click()

      cy.url().should('not.include', '/authentication')
    })
  })

  it('should redirect to dashboard after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.url().should('include', '/')
  })

  it('should show All Apartments page after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.contains('All Apartments', { timeout: 2000 }).should('be.visible')
  })
  it('should click the "View" button for an active apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 1000 }).should('be.visible')

    // Find the first button with text "View" and click it
    cy.contains('button', 'View', { timeout: 1000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')
  })

  it('should click sidebar item to go to the "Monthly Invoice" page for an apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 5000 }).should('be.visible')

    // Click the first "View" button for an active apartment
    cy.contains('button', 'View', { timeout: 5000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')

    // Click the "Invoices" button using data-testid
    cy.contains('Invoices', { timeout: 5000 }).should('not.be.disabled').click()
    cy.contains('Monthly Invoices', { timeout: 5000 }).should('not.be.disabled').click()

    // Verify we are on the monthly invoices page
    cy.url({ timeout: 5000 }).should('include', '/monthly-invoice')
    cy.contains('Monthly Invoices', { timeout: 5000 }).should('be.visible')
  })
})

describe('Rentora View Overdue Invoices', () => {
  beforeEach(() => {
    cy.session('adminLogin', () => {
      cy.visit(`${Cypress.env('uiBaseUrl')}/authentication`)

      cy.get('input[name="email"]').type('admin@example.com', { force: true })
      cy.get('input[name="password"]').type('admin123', { force: true })
      cy.get('button[type="submit"]').click()

      cy.url().should('not.include', '/authentication')
    })
  })

  it('should redirect to dashboard after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.url().should('include', '/')
  })

  it('should show All Apartments page after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.contains('All Apartments', { timeout: 2000 }).should('be.visible')
  })
  it('should click the "View" button for an active apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 1000 }).should('be.visible')

    // Find the first button with text "View" and click it
    cy.contains('button', 'View', { timeout: 1000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')
  })

  it('should click sidebar item to go to the "Overdue Invoice" page for an apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 5000 }).should('be.visible')

    // Click the first "View" button for an active apartment
    cy.contains('button', 'View', { timeout: 5000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')

    // Click the "Invoices" button using data-testid
    cy.contains('Invoices', { timeout: 5000 }).should('not.be.disabled').click()
    cy.contains('Overdue Invoices', { timeout: 5000 }).should('not.be.disabled').click()

    // Verify we are on the monthly invoices page
    cy.url({ timeout: 5000 }).should('include', '/overdue-invoice')
    cy.contains('Overdue Invoices', { timeout: 5000 }).should('be.visible')
  })
})

describe('Rentora View All Rooms', () => {
  beforeEach(() => {
    cy.session('adminLogin', () => {
      cy.visit(`${Cypress.env('uiBaseUrl')}/authentication`)

      cy.get('input[name="email"]').type('admin@example.com', { force: true })
      cy.get('input[name="password"]').type('admin123', { force: true })
      cy.get('button[type="submit"]').click()

      cy.url().should('not.include', '/authentication')
    })
  })

  it('should redirect to dashboard after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.url().should('include', '/')
  })

  it('should show All Apartments page after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.contains('All Apartments', { timeout: 2000 }).should('be.visible')
  })
  it('should click the "View" button for an active apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 1000 }).should('be.visible')

    // Find the first button with text "View" and click it
    cy.contains('button', 'View', { timeout: 1000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')
  })

  it('should click sidebar item to go to the "All Rooms" page for an apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 5000 }).should('be.visible')

    // Click the first "View" button for an active apartment
    cy.contains('button', 'View', { timeout: 5000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')

    cy.contains('All Rooms', { timeout: 5000 }).should('not.be.disabled').click()

    // Verify we are on the monthly invoices page
    cy.url({ timeout: 5000 }).should('include', '/all-room')
    cy.contains('All rooms with category dashboard', { timeout: 5000 }).should('be.visible')
  })
})

describe('Rentora View Meter Readings', () => {
  beforeEach(() => {
    cy.session('adminLogin', () => {
      cy.visit(`${Cypress.env('uiBaseUrl')}/authentication`)

      cy.get('input[name="email"]').type('admin@example.com', { force: true })
      cy.get('input[name="password"]').type('admin123', { force: true })
      cy.get('button[type="submit"]').click()

      cy.url().should('not.include', '/authentication')
    })
  })

  it('should redirect to dashboard after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.url().should('include', '/')
  })

  it('should show All Apartments page after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.contains('All Apartments', { timeout: 2000 }).should('be.visible')
  })
  it('should click the "View" button for an active apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 1000 }).should('be.visible')

    // Find the first button with text "View" and click it
    cy.contains('button', 'View', { timeout: 1000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')
  })

  it('should click sidebar item to go to the "Meter Reading" page for an apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 5000 }).should('be.visible')

    // Click the first "View" button for an active apartment
    cy.contains('button', 'View', { timeout: 5000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')

    cy.contains('Meter Reading', { timeout: 5000 }).should('not.be.disabled').click()

    cy.url({ timeout: 5000 }).should('include', '/meter-reading')
    cy.contains('View and manage meter readings by date', { timeout: 5000 }).should('be.visible')
  })
})

describe('Rentora View Report', () => {
  beforeEach(() => {
    cy.session('adminLogin', () => {
      cy.visit(`${Cypress.env('uiBaseUrl')}/authentication`)

      cy.get('input[name="email"]').type('admin@example.com', { force: true })
      cy.get('input[name="password"]').type('admin123', { force: true })
      cy.get('button[type="submit"]').click()

      cy.url().should('not.include', '/authentication')
    })
  })

  it('should redirect to dashboard after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.url().should('include', '/')
  })

  it('should show All Apartments page after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.contains('All Apartments', { timeout: 2000 }).should('be.visible')
  })
  it('should click the "View" button for an active apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 1000 }).should('be.visible')

    // Find the first button with text "View" and click it
    cy.contains('button', 'View', { timeout: 1000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')
  })

  it('should click sidebar item to go to the "Report" page for an apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 5000 }).should('be.visible')

    // Click the first "View" button for an active apartment
    cy.contains('button', 'View', { timeout: 5000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')

    cy.contains('Reports', { timeout: 5000 }).should('not.be.disabled').click()
    cy.contains('Electric & Water Report', { timeout: 5000 }).should('not.be.disabled').click()

    cy.url({ timeout: 5000 }).should('include', '/report/electric-water')
    cy.contains('Electric & Water Usage', { timeout: 5000 }).should('be.visible')
  })
})

describe('Rentora view Maintenances', () => {
  beforeEach(() => {
    cy.session('adminLogin', () => {
      cy.visit(`${Cypress.env('uiBaseUrl')}/authentication`)

      cy.get('input[name="email"]').type('admin@example.com', { force: true })
      cy.get('input[name="password"]').type('admin123', { force: true })
      cy.get('button[type="submit"]').click()

      cy.url().should('not.include', '/authentication')
    })
  })

  it('should redirect to dashboard after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.url().should('include', '/')
  })

  it('should show All Apartments page after login', () => {
    cy.visit(Cypress.env('uiBaseUrl'))
    cy.contains('All Apartments', { timeout: 2000 }).should('be.visible')
  })
  it('should click the "View" button for an active apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 1000 }).should('be.visible')

    // Find the first button with text "View" and click it
    cy.contains('button', 'View', { timeout: 1000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')
  })

  it('should click sidebar item to go to the "Maintenance" page for an apartment', () => {
    cy.visit(Cypress.env('uiBaseUrl'))

    // Wait for the apartments to load
    cy.contains('All Apartments', { timeout: 5000 }).should('be.visible')

    // Click the first "View" button for an active apartment
    cy.contains('button', 'View', { timeout: 5000 }).should('not.be.disabled').click()

    // Verify navigation to apartment detail page
    cy.url({ timeout: 5000 }).should('include', '/dashboard/')
    cy.contains('Apartment Management Dashboard', { timeout: 5000 }).should('be.visible')

    cy.contains('Maintenance', { timeout: 5000 }).should('not.be.disabled').click()

    cy.url({ timeout: 5000 }).should('include', '/maintenance')
    cy.contains('Manage maintenance reports', { timeout: 5000 }).should('be.visible')
  })
})
