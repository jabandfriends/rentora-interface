import { AlertCircle, ArrowLeft, Building, CheckCircle, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button, Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { ROUTES } from '@/constants'

import MonthlyInvoiceCreateTable from './MonthlyInvoiceCreateTable'

const MonthlyInvoiceCreate = () => {
  const navigate = useNavigate()
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button className="flex items-center gap-x-2" onClick={() => navigate(ROUTES.monthlyInvoice.path)}>
          <ArrowLeft className="size-5" />
          Back to Monthly Invoices
        </Button>
      </div>
      <div className="space-y-6">
        {/* Header */}
        <Card className="rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <FileText className="text-theme-primary size-8" />
            <div>
              <h3>Generate Monthly Invoices</h3>
              <p className="text-body-2 text-theme-secondary">Create rent invoices for all units</p>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <label className="text-body-2">Meter Reading Date</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1/09/2025">1/09/2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-body-2">Billing Month</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1/09/2025">1/09/2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button block className="flex items-center gap-x-2">
              Generate All Invoices
            </Button>
          </div>

          {/* Statistics */}
          <div className="desktop:grid-cols-3 grid gap-4">
            <div className="bg-theme-primary-100 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Building className="text-theme-primary size-5" />
                <h4 className="text-theme-primary">Total Rooms</h4>
              </div>
              <p className="text-theme-primary-800">5</p>
            </div>

            <div className="bg-theme-success-100 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-theme-success-600 size-5" />
                <h4 className="text-theme-success-600">Generated</h4>
              </div>
              <p className="text-theme-success-800">3</p>
            </div>

            <div className="bg-theme-warning-100 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-theme-warning-600 size-5" />
                <h4 className="text-theme-warning-600">Pending</h4>
              </div>
              <p className="text-theme-warning-800">1</p>
            </div>
          </div>
        </Card>

        {/* Rooms List */}
        <Card className="rounded-xl py-4 shadow-sm">
          <div>
            <h3>Rooms Invoice Status</h3>
            <p className="text-body-2 text-theme-secondary">Billing Period: September 2025</p>
          </div>

          <div className="overflow-x-auto">
            <MonthlyInvoiceCreateTable />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default MonthlyInvoiceCreate
