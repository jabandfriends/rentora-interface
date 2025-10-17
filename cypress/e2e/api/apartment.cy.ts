import { login } from './utils/login'

describe('Apartment , Maintenance API', () => {
  let token: string

  let apartmentId: string
  let buildingId: string
  let floorId: string
  let unitId: string
  let userId: string

  const payload = {
    name: 'ACHIRAYA 4',
    phoneNumber: '+6612344444',
    taxId: '123456789000',
    paymentDueDay: 1,
    lateFee: 555.0,
    lateFeeType: 'fixed',
    gracePeriodDays: 3,
    address: '123 Salaya',
    city: 'Bangkok',
    state: 'Bangkok',
    postalCode: '10110',
    country: 'Thailand',
  }

  const params = {
    page: 1,
    pageSize: 10,
  }

  before(() => {
    // Login first
    login().then((t) => (token = t))
  })

  it('Create a new apartment', () => {
    cy.request({
      method: 'POST',
      url: Cypress.env('apiBaseUrl') + '/api/apartments',
      headers: { 'Rentora-Auth-Token': token },
      body: payload,
    }).then((res) => {
      expect(res.status).to.eq(201) // or 200 if backend returns 200
      expect(res.body.success).to.eq(true)
      expect(res.body.data).to.have.property('apartmentId')

      // Save apartmentId for later tests
      apartmentId = res.body.data.apartmentId
      cy.log('Created apartmentId: ' + apartmentId)
    })
  })
  it('Create Building', () => {
    const buildingPayload = {
      apartmentId,
      name: 'Building B',
      description: 'Second building in apartment',
      totalFloors: 20,
    }

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/${apartmentId}/buildings`,
      headers: { 'Rentora-Auth-Token': token },
      body: buildingPayload,
    }).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body.success).to.eq(true)

      // Save buildingId for floor creation
      buildingId = res.body.data.id
      cy.log('Created buildingId: ' + buildingId)
    })
  })

  it('Setup Apartment', () => {
    const setupPayload = {
      apartmentId,
      bankName: 'Test Bank',
      bankAccountHolder: 'John Doe',
      bankAccountNumber: '1234567890',
      buildings: [{ buildingName: 'Building B', totalFloors: 20, totalUnitPerFloor: 4 }],
      electricityFlat: 500,
      electricityPrice: 5,
      electricityType: 'meter',
      services: [
        { name: 'Internet', price: 100 },
        { name: 'Cleaning', price: 50 },
      ],
      waterFlat: 300,
      waterPrice: 2,
      waterType: 'meter',
    }

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/setup/${apartmentId}`,
      headers: { 'Rentora-Auth-Token': token },
      body: setupPayload,
    }).then((res) => {
      expect(res.status).to.eq(200)
      cy.log('Apartment setup completed for apartmentId: ' + apartmentId)
    })
  })

  it('Create Floor', () => {
    const floorPayload = {
      buildingId, // now this is defined
      floorNumber: 1,
      floorName: 'Floor 1',
      totalUnits: 10,
    }

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/floor`,
      headers: { 'Rentora-Auth-Token': token },
      body: floorPayload,
    }).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body.success).to.eq(true)

      // Save floorId for unit creation
      floorId = res.body.data.id
      cy.log('Created floorId: ' + floorId)
    })
  })

  it('Create Unit', () => {
    const unitPayload = {
      floorId, // must exist
      unitName: 'Unit 101',
      bedrooms: 2,
      bathrooms: 1,
      squareMeters: 50,
      balconyCount: 1,
      parkingSpaces: 1,
    }

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/${apartmentId}/units`,
      headers: { 'Rentora-Auth-Token': token },
      body: unitPayload,
    }).then((res) => {
      expect(res.status).to.eq(201)
      expect(res.body.success).to.eq(true)

      // Save unitId for later tests
      unitId = res.body.data.id
      cy.log('Created unitId: ' + unitId)
    })
  })

  it('Create Adhoc Invoice', () => {
    const payload = {
      unitId: unitId, // from previously created unit
      title: 'Fix AC',
      description: 'Air conditioner maintenance',
      invoiceDate: '2025-10-17',
      dueDate: '2025-10-25',
      category: 'miscellaneous', // ADHOC_INVOICE_CATEGORY
      finalAmount: 1500,
      notes: 'Urgent',
      includeInMonthly: false,
      priority: 'high', // ADHOC_INVOICE_PRIORITY
    }

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/api/invoices/${apartmentId}/adhocInvoice/create`,
      headers: { 'Rentora-Auth-Token': token },
      body: payload,
    }).then((res) => {
      expect(res.status).to.eq(201) // or check what backend returns
      expect(res.body.success).to.eq(true)
      expect(res.body.data).to.have.property('adhocInvoiceId')
      cy.log('Created Adhoc Invoice Id: ' + res.body.data.adhocInvoiceId)
    })
  })

  it('Update Apartment Name', () => {
    const updatePayload = {
      name: 'ACHIRAYA 4 Updated', // only updating name
    }

    cy.request({
      method: 'PUT',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/${apartmentId}`,
      headers: { 'Rentora-Auth-Token': token },
      body: updatePayload,
    }).then((res) => {
      expect(res.status).to.eq(200) // check backend response status
      //update payload
      payload.name = updatePayload.name
      cy.log('Apartment updated successfully')
    })
  })

  it('Get apartment detail using apartmentId', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/${apartmentId}`,
      headers: { 'Rentora-Auth-Token': token },
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.data).to.have.property('name').eq(payload.name)
    })
  })

  it('Get apartments', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env('apiBaseUrl') + '/api/apartments',
      headers: { 'Rentora-Auth-Token': token }, // <-- send token here
    }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('Create a new tenant', () => {
    const tenantPayload = {
      firstName: 'John',
      lastName: 'Doe',
      email: `john.doe+${Date.now()}@example.com`, // unique email per test
      password: 'SecurePass123!',
      phoneNumber: '0626063049',
      birthDate: '1990-01-01',
      nationalId: '1234567890123',
      emergencyContactName: 'Jane Doe',
      emergencyContactPhone: '0626063049',
    }

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/manage/tenant/${apartmentId}`,
      headers: { 'Rentora-Auth-Token': token },
      body: tenantPayload,
    }).then((res) => {
      expect(res.status).to.eq(200) // or 201 depending on backend
      expect(res.body.success).to.eq(true)
      // apartmentUserId
      userId = res.body.data.apartmentUserId
      cy.log('Tenant created successfully' + userId)
    })
  })

  it('Create a new maintenance request', () => {
    const payload = {
      unitId,
      title: 'Fix AC',
      description: 'Air conditioner maintenance',
      status: 'pending', // MAINTENANCE_STATUS.PENDING
      priority: 'high', // MAINTENANCE_PRIORITY.HIGH
      appointmentDate: '2025-10-20T09:00:00+07:00', // <-- full datetime
      dueDate: '2025-10-22T17:00:00+07:00', // <-- full datetime
      estimatedHours: 4,
      estimatedCost: 1500,
      category: 'electrical', // MAINTENANCE_CATEGORY.ELECTRICITY
      isEmergency: true,
      isRecurring: true,
      recurringSchedule: 'weekly', // RecurringSchedule.WEEKLY
    }

    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/api/apartment/${apartmentId}/maintenance/users/create`,
      headers: { 'Rentora-Auth-Token': token },
      body: payload,
    }).then((res) => {
      expect(res.status).to.eq(201)
    })
  })

  it('Get maintenance list for apartment', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/api/apartment/${apartmentId}/maintenance`,
      headers: { 'Rentora-Auth-Token': token },
      qs: params, // query string parameters
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.success).to.eq(true)
      expect(res.body.data).to.have.property('data')
      expect(res.body.data.data).to.be.an('array')

      // check the first item has required properties
      if (res.body.data.data.length > 0) {
        const item = res.body.data.data[0]
        expect(item).to.have.property('id')
        expect(item).to.have.property('ticketNumber')
        expect(item).to.have.property('status')
        expect(item).to.have.property('appointmentDate')
      }
    })
  })

  it('Get invoice list for apartment should return 200', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/api/invoices/${apartmentId}`,
      headers: { 'Rentora-Auth-Token': token },
      qs: params,
    }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('Get tenant list should return 200', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/manage/tenant/${apartmentId}`,
      headers: { 'Rentora-Auth-Token': token },
      qs: params,
    }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('Get unit list should return 200', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/${apartmentId}/units`,
      headers: { 'Rentora-Auth-Token': token },
      qs: params,
    }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('Get contract list should return 200', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/${apartmentId}/contracts`,
      headers: { 'Rentora-Auth-Token': token },
      qs: params,
    }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('Get unit utility available year should return 200', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/${apartmentId}/unit/utility/years`,
      headers: { 'Rentora-Auth-Token': token },
    }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('Get utility list should return 200', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/${apartmentId}/utility`,
      headers: { 'Rentora-Auth-Token': token },
    }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('Get monthly invoice list should return 200', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/api/monthly/invoices/${apartmentId}`,
      headers: { 'Rentora-Auth-Token': token },
      qs: params,
    }).then((res) => {
      expect(res.status).to.eq(200)
    })
  })

  it('Delete unit', () => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/${apartmentId}/units/${unitId}`,
      headers: { 'Rentora-Auth-Token': token },
    }).then((res) => {
      expect(res.status).to.eq(200) // or 204 if backend returns no content
      cy.log('Unit deleted successfully')
    })
  })
  it('Delete floor', () => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/floor/${floorId}`,
      headers: { 'Rentora-Auth-Token': token },
    }).then((res) => {
      expect(res.status).to.eq(200) // or 204 depending on backend
      cy.log('Floor deleted successfully')
    })
  })

  it('Delete building', () => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiBaseUrl')}/api/apartments/${apartmentId}/buildings/${buildingId}`,
      headers: { 'Rentora-Auth-Token': token },
    }).then((res) => {
      expect(res.status).to.eq(200) // or 204 depending on backend
      cy.log('Building deleted successfully')
    })
  })
})
