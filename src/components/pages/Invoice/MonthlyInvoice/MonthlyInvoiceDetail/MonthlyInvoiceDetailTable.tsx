import { Building, Droplets, Zap } from 'lucide-react'
import { useMemo } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { CONTRACT_RENTAL_TYPE, UtilityPriceType } from '@/enum'
import type { IMonthlyInvoiceDetail } from '@/types'
import { formatCurrency, formatNumber, getDateDiff } from '@/utilities'

const MonthlyInvoiceDetailTable = ({ invoice }: { invoice: IMonthlyInvoiceDetail }) => {
  const {
    waterPrice,
    waterUnit,
    electricPrice,
    electricUnit,
  }: {
    waterPrice: string
    waterUnit: string
    electricPrice: string
    electricUnit: string
  } = useMemo(() => {
    let waterPrice: string = ''
    let electricPrice: string = ''
    let electricUnit: string = ''
    let waterUnit: string = ''
    if (invoice.waterPriceRateType === UtilityPriceType.FIXED) {
      waterPrice = formatCurrency(invoice.waterFixedPrice)
      waterUnit = 'fixed'
    } else if (invoice.waterPriceRateType === UtilityPriceType.METER) {
      waterPrice = formatCurrency(invoice.waterPricePerUnit)
      waterUnit = '/ unit'
    }
    if (invoice.electricPriceRateType === UtilityPriceType.FIXED) {
      electricPrice = formatCurrency(invoice.electricFixedPrice)
      electricUnit = 'fixed'
    } else if (invoice.electricPriceRateType === UtilityPriceType.METER) {
      electricPrice = formatCurrency(invoice.electricPricePerUnit)
      electricUnit = '/ unit'
    }
    return {
      waterPrice,
      electricPrice,
      electricUnit,
      waterUnit,
    }
  }, [invoice])

  const { rentPrice, rentUnit } = useMemo(() => {
    let rentPrice: string = ''
    let rentUnit: string = ''
    if (invoice.rentalType === CONTRACT_RENTAL_TYPE.DAILY) {
      rentPrice = formatCurrency(invoice.contractRentAmount)
      rentUnit = '/ night'
    } else if (invoice.rentalType === CONTRACT_RENTAL_TYPE.MONTHLY) {
      rentPrice = formatCurrency(invoice.contractRentAmount)
      rentUnit = '/ month'
    }
    return {
      rentPrice,
      rentUnit,
    }
  }, [invoice])

  return (
    <div className="space-y-2">
      <div>
        <h4>Rent & Utility Details</h4>
        <p className="text-theme-secondary text-body-2">{invoice.serviceList.length} items</p>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100">
          <TableRow>
            <TableCell className="py-4">
              <div className="flex items-center gap-2">
                <Building className="text-theme-primary size-4" />
                <span className="flex flex-col capitalize">
                  {invoice.rentalType} Rent
                  <span className="text-theme-secondary text-body-3">{invoice.unitName}</span>
                </span>
              </div>
            </TableCell>
            <TableCell>{getDateDiff(invoice.billStart, invoice.billEnd).days} days</TableCell>
            <TableCell className="py-4">{rentPrice ? `${rentPrice} ${rentUnit}` : '-'}</TableCell>
            <TableCell className="py-4">{formatCurrency(invoice.rentAmount)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="py-4">
              <div className="flex items-center gap-2">
                <Droplets className="text-theme-primary size-4" />
                <div>
                  <span>Water Usage</span>
                  <div className="text-theme-secondary text-body-3">
                    Previous: {formatNumber(invoice.waterMeterStart)} | Current: {formatNumber(invoice.waterMeterEnd)}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className="py-4">{formatNumber(invoice.totalWaterUsageUnit)} units</TableCell>
            <TableCell className="py-4">
              {waterPrice} {waterUnit}
            </TableCell>
            <TableCell className="py-4">{formatCurrency(invoice.waterTotalCost)} </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="py-4">
              <div className="flex items-center gap-2">
                <Zap className="text-theme-warning size-4" />
                <div>
                  <span>Electricity Usage</span>
                  <div className="text-theme-secondary text-body-3">
                    Previous: {formatNumber(invoice.electricMeterStart)} | Current:{' '}
                    {formatNumber(invoice.electricMeterEnd)}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell className="py-4">{formatNumber(invoice.totalElectricUsageUnit)} units</TableCell>
            <TableCell className="py-4">
              {electricPrice} {electricUnit}
            </TableCell>
            <TableCell className="py-4">{formatCurrency(invoice.electricTotalCost)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default MonthlyInvoiceDetailTable
