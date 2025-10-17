import { Spinner } from '@/components/common'
import { PaginationBar } from '@/components/feature'
import { RoomCard } from '@/components/pages/Invoice'
import { PageTableBody, PageTableEmpty } from '@/components/ui/PageTable'
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
    <PageTableBody className="flex flex-col gap-y-4 py-10">
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
    </PageTableBody>
  )
}

export default MonthlyInvoiceBody
