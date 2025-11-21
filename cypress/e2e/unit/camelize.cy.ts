import { camelizeKeys } from '../../../src/utilities/camelize'

describe('camelizeKeys()', () => {
  it('should convert snake_case keys to camelCase (simple object)', () => {
    const input = {
      first_name: 'John',
      last_name: 'Doe',
    }

    const result = camelizeKeys(input)

    expect(result).to.deep.equal({
      firstName: 'John',
      lastName: 'Doe',
    })
  })

  it('should convert nested objects', () => {
    const input = {
      user_info: {
        first_name: 'John',
        address_info: {
          zip_code: 12345,
        },
      },
    }

    const result = camelizeKeys(input)

    expect(result).to.deep.equal({
      userInfo: {
        firstName: 'John',
        addressInfo: {
          zipCode: 12345,
        },
      },
    })
  })

  it('should convert array of objects', () => {
    const input = {
      users: [{ first_name: 'Alice' }, { first_name: 'Bob' }],
    }

    const result = camelizeKeys(input)

    expect(result).to.deep.equal({
      users: [{ firstName: 'Alice' }, { firstName: 'Bob' }],
    })
  })

  it('should return primitive types as-is', () => {
    expect(camelizeKeys('hello')).to.equal('hello')
    expect(camelizeKeys(123)).to.equal(123)
    expect(camelizeKeys(true)).to.equal(true)
    expect(camelizeKeys(null)).to.equal(null)
  })
})
