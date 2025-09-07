import { Building, Droplets, Zap } from 'lucide-react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'

const MonthlyInvoiceDetailTable = () => {
  return (
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
              <span>Monthly Rent - A-101</span>
            </div>
          </TableCell>
          <TableCell>1</TableCell>
          <TableCell className="py-4">฿10,000</TableCell>
          <TableCell className="py-4">฿10,000</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="py-4">
            <div className="flex items-center gap-2">
              <Droplets className="text-theme-primary size-4" />
              <div>
                <span>Water Usage</span>
                <div className="text-theme-secondary text-body-3">Previous: 1180 | Current: 1200</div>
              </div>
            </div>
          </TableCell>
          <TableCell className="py-4">70 units</TableCell>
          <TableCell className="py-4">฿18.00</TableCell>
          <TableCell className="py-4">฿1,260</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="py-4">
            <div className="flex items-center gap-2">
              <Zap className="text-theme-warning size-4" />
              <div>
                <span>Electricity Usage</span>
                <div className="text-theme-secondary text-body-3">Previous: 1,180 | Current: 1,200</div>
              </div>
            </div>
          </TableCell>
          <TableCell className="py-4">130 units</TableCell>
          <TableCell className="py-4">Tiered Rate</TableCell>
          <TableCell className="py-4">฿1,260</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default MonthlyInvoiceDetailTable
