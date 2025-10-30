import { EmptyPage, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import type { IMonthlyInvoiceService } from '@/types'
import { formatCurrency } from '@/utilities'

const MonthlyInvoiceDetailUnitService = ({ serviceList }: { serviceList: Array<IMonthlyInvoiceService> }) => {
  if (!serviceList || serviceList.length === 0)
    return (
      <div className="space-y-2">
        <div>
          <h4>Extra Services</h4>
          <p className="text-theme-secondary text-body-2">{serviceList.length} services</p>
        </div>
        <div className="border-theme-secondary-300 rounded-lg border">
          <EmptyPage title="No extra services found" description="No extra services found for this unit" />
        </div>
      </div>
    )
  return (
    <div className="space-y-2">
      <div>
        <h4>Extra Services</h4>
        <p className="text-theme-secondary text-body-2">{serviceList.length} services</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service Name</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {serviceList.map((service, index) => (
            <TableRow key={service.serviceName + index}>
              <TableCell>{service.serviceName}</TableCell>
              <TableCell>{formatCurrency(service.servicePrice)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default MonthlyInvoiceDetailUnitService
