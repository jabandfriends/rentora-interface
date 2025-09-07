import { CheckCircle, Droplets, Eye, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/common'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { ROUTES } from '@/constants'

const MonthlyInvoiceCreateTable = () => {
  const navigate = useNavigate()
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Room</TableHead>
          <TableHead>Tenant</TableHead>
          <TableHead>Usage</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <div>
              <p>A-101</p>
              <p className="text-body-3 text-theme-secondary">Building A</p>
            </div>
          </TableCell>

          <TableCell>
            <div>
              <p className="text-body-2">John Doe</p>
              <p className="text-body-3 text-theme-secondary">1234567890</p>
            </div>
          </TableCell>

          <TableCell>
            <div className="space-y-1">
              <div className="text-body-2 flex items-center gap-1">
                <Droplets className="text-theme-primary-500 h-3 w-3" />
                <span>10 units</span>
              </div>
              <div className="text-body-2 flex items-center gap-1">
                <Zap className="text-theme-warning-500 h-3 w-3" />
                <span>20 units</span>
              </div>
            </div>
          </TableCell>

          <TableCell>
            <p className="text-body-2">฿1,000</p>
          </TableCell>

          <TableCell>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-theme-success-500 h-4 w-4" />
              <span className="text-theme-success-700 text-sm">Generated</span>
            </div>
          </TableCell>

          <TableCell>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => navigate(ROUTES.monthlyInvoiceDetail.getURL('1'))}
                className="bg-theme-success-100 text-theme-success-500 hover:bg-theme-success-200 flex items-center gap-x-2"
              >
                <Eye className="size-3" />
                View Detail
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default MonthlyInvoiceCreateTable
