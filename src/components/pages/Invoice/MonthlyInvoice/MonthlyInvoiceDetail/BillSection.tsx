import { FieldEmpty } from '@/components/ui'
import type { IMonthlyInvoiceDetail } from '@/types'

const BillSection = ({ invoice }: { invoice: IMonthlyInvoiceDetail }) => {
  return (
    <div className="desktop:grid-cols-2 grid gap-x-8 gap-y-4">
      {/* Tenant Info */}
      <div className="space-y-2">
        <h4>BILL TO :</h4>
        <div>
          <p className="text-body-2 font-medium">{invoice.tenantName}</p>
          <div className="text-theme-secondary text-body-2">
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
      <div className="space-y-2">
        <h4>BILLING PERIOD :</h4>
        <div className="text-theme-secondary text-body-2">
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
