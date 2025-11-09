import { Calendar, FileCheck, Search } from 'lucide-react'

import { Spinner } from '@/components/common'
import { PaginationBar } from '@/components/feature'
import { RoomCard } from '@/components/pages/Invoice'
import { EmptyPage, PageTableEmpty } from '@/components/ui'
import type { IMonthlyInvoice } from '@/types'

type IMonthlyInvoiceBodyProps = {
  isSearching: boolean
  data: Array<IMonthlyInvoice>
  isLoading: boolean
  currentPage: number
  totalElements: number
  totalPages: number
  selectedGenMonth: string
  handlePageChange: (page: number) => void
}
const MonthlyInvoiceBody = ({
  isSearching,
  data,
  isLoading,
  currentPage,
  totalElements,
  totalPages,
  handlePageChange,
  selectedGenMonth,
}: IMonthlyInvoiceBodyProps) => {
  if (isLoading) {
    return (
      <PageTableEmpty icon={<Spinner />} message="Loading..." description="Please wait while we load the invoices." />
    )
  }
  if (!selectedGenMonth) {
    return (
      <EmptyPage
        icon={<Calendar size={36} />}
        title="No month selected to show the invoices"
        description="Please select a month to show the invoices"
      />
    )
  }
  if (isSearching && (!data || data.length === 0)) {
    return (
      <EmptyPage
        icon={<Search size={36} />}
        title="No invoices found for this search"
        description="Please try again with different search criteria."
      />
    )
  }
  if ((!data || data.length === 0) && selectedGenMonth) {
    return (
      <EmptyPage
        icon={<FileCheck size={50} />}
        title="Meter readings for this month are ready!"
        description="You're almost done. Please click 'New Invoice' to create invoices for this month."
      />
    )
  }

  if (!data || data.length === 0) {
    return (
      <EmptyPage
        icon={<FileCheck size={50} />}
        title="No invoices found"
        description="No invoices found for this month."
      />
    )
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
