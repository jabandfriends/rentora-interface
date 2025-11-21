import { calculateMonth, formatDate, formatTimestamp, getDateDiff, timeFromNow } from '../../../src/utilities/time'
// adjust path
describe('Date Utilities', () => {
  const now = new Date('2025-01-15T12:00:00Z')
  const later = new Date('2025-03-20T12:00:00Z')

  describe('formatTimestamp()', () => {
    it('formats ISO string to default format', () => {
      expect(formatTimestamp('2025-09-17T17:13:27.194662Z')).to.match(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)
    })

    it('formats ISO string with custom format', () => {
      expect(formatTimestamp('2025-09-17T17:13:27.194662Z', 'DD/MM/YYYY')).to.equal('18/09/2025')
    })

    it('formats with timezone', () => {
      expect(formatTimestamp('2025-09-17T17:13:27.194662Z', 'YYYY-MM-DD HH:mm', 'Asia/Bangkok')).to.equal(
        '2025-09-18 00:13',
      )
    })

    it('returns empty string for invalid input', () => {
      expect(formatTimestamp('')).to.equal('')
    })
  })

  describe('formatDate()', () => {
    it('formats Date object to default format', () => {
      expect(formatDate(now)).to.equal('15-01-2025 19:00:00')
    })

    it('formats with custom format', () => {
      expect(formatDate(now, 'YYYY/MM/DD')).to.equal('2025/01/15')
    })

    it('returns empty string for invalid input', () => {
      expect(formatDate(null as unknown as Date)).to.equal('')
    })
  })

  describe('calculateMonth()', () => {
    it('calculates months difference', () => {
      expect(calculateMonth(now, later)).to.equal(2)
    })

    it('returns 0 for invalid dates', () => {
      expect(calculateMonth(null as unknown as Date, later)).to.equal(0)
    })
  })

  describe('getDateDiff()', () => {
    it('returns correct days, months, years', () => {
      const diff = getDateDiff(now, later)
      expect(diff).to.deep.equal({ days: 65, months: 3, years: 0 })
    })

    it('returns 0 for invalid inputs', () => {
      expect(getDateDiff('', later)).to.deep.equal({ days: 0, months: 0, years: 0 })
    })
  })

  describe('timeFromNow()', () => {
    it('returns relative time', () => {
      const past = new Date(Date.now() - 3600 * 1000).toISOString() // 1 hour ago
      const result = timeFromNow(past)
      expect(result).to.match(/hour|minute|second/)
    })

    it('returns empty string for invalid input', () => {
      expect(timeFromNow('')).to.equal('')
    })
  })
})
