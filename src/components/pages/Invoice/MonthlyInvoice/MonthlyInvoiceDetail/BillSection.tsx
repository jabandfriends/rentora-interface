import { FieldEmpty } from '@/components/ui'
import type { IMonthlyInvoiceDetail } from '@/types'

const BillSection = ({ invoice }: { invoice: IMonthlyInvoiceDetail }) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      {/* Tenant Info */}
      <div>
        <h4>BILL TO:</h4>
        <div className="space-y-1">
          <p className="font-medium">{invoice.tenantName}</p>
          <div className="text-theme-secondary">
            <p>{invoice.tenantEmail}</p>
            <p>{invoice.tenantPhone ? invoice.tenantPhone : <FieldEmpty />}</p>
            <p>Unit: {invoice.unitName}</p>
            <p>
              {invoice.buildingName} - {invoice.floorName}
            </p>
          </div>
        </div>
      </div>

      {/* Billing Period */}
      <div>
        <h4>BILLING PERIOD:</h4>
        <div className="text-theme-secondary space-y-1">
          <p>
            {invoice.billStart} - {invoice.billEnd}
          </p>
          <p>Due Date: {invoice.dueDate}</p>
          <p>Contract: {invoice.contractNumber}</p>
        </div>
      </div>
    </div>
  )
}

export default BillSection
