export function formatNumber(value: number, decimalPlaces: number = 0, useThousandsSeparator: boolean = true): string {
  if (isNaN(value)) return '0'

  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    useGrouping: useThousandsSeparator,
  }

  return value.toLocaleString(undefined, options)
}

export function formatCurrency(value: number, decimalPlaces: number = 2, currencySymbol: string = '฿'): string {
  return `${currencySymbol}${formatNumber(value, decimalPlaces)}`
}
