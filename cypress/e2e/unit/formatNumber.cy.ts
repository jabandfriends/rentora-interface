import { formatCurrency, formatNumber } from '../../../src/utilities/number' // adjust path

describe('Number Formatting Utilities', () => {
  describe('formatNumber()', () => {
    it('formats integers without decimals', () => {
      expect(formatNumber(1234)).to.equal('1,234')
    })

    it('formats decimals correctly', () => {
      expect(formatNumber(1234.567, 2)).to.equal('1,234.57')
      expect(formatNumber(1234.5, 3)).to.equal('1,234.500')
    })

    it('disables thousands separator when requested', () => {
      expect(formatNumber(1234.567, 2, false)).to.equal('1234.57')
    })

    it('returns "0" for NaN', () => {
      expect(formatNumber(NaN)).to.equal('0')
    })

    it('works for negative numbers', () => {
      expect(formatNumber(-1234.5, 1)).to.equal('-1,234.5')
    })
  })

  describe('formatCurrency()', () => {
    it('adds default currency symbol', () => {
      expect(formatCurrency(1234.56)).to.equal('฿1,234.56')
    })

    it('formats with custom decimal places', () => {
      expect(formatCurrency(1234.567, 1)).to.equal('฿1,234.6')
    })

    it('formats with custom currency symbol', () => {
      expect(formatCurrency(1234.56, 2, '$')).to.equal('$1,234.56')
    })

    it('returns "0" for NaN', () => {
      expect(formatCurrency(NaN)).to.equal('0')
    })

    it('works for negative numbers', () => {
      expect(formatCurrency(-1234.56)).to.equal('฿-1,234.56')
    })
  })
})
