import { EmptyPage, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import type { IMonthlyInvoiceUnitAdhocInvoice } from '@/types'
import { formatCurrency } from '@/utilities'

const MonthlyInvoiceDetailUnitAdhocInvoice = ({
  adhocInvoices,
}: {
  adhocInvoices: Array<IMonthlyInvoiceUnitAdhocInvoice>
}) => {
  if (!adhocInvoices || adhocInvoices.length === 0)
    return (
      <div className="space-y-2">
        <div>
          <h4>Adhoc Invoices</h4>
          <p className="text-theme-secondary text-body-2">{adhocInvoices.length} invoices</p>
        </div>
        <div className="border-theme-secondary-300 rounded-lg border">
          <EmptyPage title="No adhoc invoices found" description="No adhoc invoices found for this unit" />
        </div>
      </div>
    )
  return (
    <div className="space-y-2">
      <div>
        <h4>Adhoc Invoices</h4>
        <p className="text-theme-secondary text-body-2">{adhocInvoices.length} invoices</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Adhoc Number</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adhocInvoices.map((adhocInvoice: IMonthlyInvoiceUnitAdhocInvoice, index) => (
            <TableRow key={adhocInvoice.adhocId + index}>
              <TableCell>{adhocInvoice.adhocNumber}</TableCell>
              <TableCell>{adhocInvoice.adhocTitle}</TableCell>
              <TableCell>{formatCurrency(adhocInvoice.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default MonthlyInvoiceDetailUnitAdhocInvoice
