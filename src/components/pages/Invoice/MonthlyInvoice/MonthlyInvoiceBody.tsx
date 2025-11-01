import { Spinner } from '@/components/common'
import { PaginationBar } from '@/components/feature'
import { RoomCard } from '@/components/pages/Invoice'
import { PageTableEmpty } from '@/components/ui'
import type { IMonthlyInvoice } from '@/types'

type IMonthlyInvoiceBodyProps = {
  data: Array<IMonthlyInvoice>
  isLoading: boolean
  currentPage: number
  totalElements: number
  totalPages: number
  handlePageChange: (page: number) => void
}
const MonthlyInvoiceBody = ({
  data,
  isLoading,
  currentPage,
  totalElements,
  totalPages,
  handlePageChange,
}: IMonthlyInvoiceBodyProps) => {
  if (isLoading) {
    return (
      <PageTableEmpty icon={<Spinner />} message="Loading..." description="Please wait while we load the invoices." />
    )
  }
  if (!data || data.length === 0) {
    return <PageTableEmpty message="No invoices found" />
  }
  return (
    <div className="flex flex-col gap-y-4">
      <div className="desktop:grid-cols-4 grid gap-5">
        {data.map((invoice: IMonthlyInvoice) => (
          <RoomCard key={invoice.invoiceId} invoice={invoice} />
        ))}
      </div>
      <PaginationBar
        totalElements={totalElements}
        page={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default MonthlyInvoiceBody
