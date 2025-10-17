export const login = (): Cypress.Chainable<string> => {
  return cy
    .request('POST', Cypress.env('apiBaseUrl') + '/api/auth/login', {
      email: 'admin@example.com',
      password: 'admin123',
    })
    .then((res) => {
      expect(res.status).to.eq(200)
      return res.body.data.accessToken
    })
}
