import { RoomCard } from '@/components/pages/Invoice'
import { PaginationBar } from '@/components/ui'
import { PageTableBody } from '@/components/ui/PageTable'

const MonthlyInvoiceBody = () => {
  return (
    <PageTableBody className="flex flex-col gap-y-4 py-10">
      <div className="desktop:grid-cols-3 grid place-items-center gap-5">
        {[...Array(12)].map((_, index) => (
          <RoomCard key={index} />
        ))}
      </div>
      <PaginationBar />
    </PageTableBody>
  )
}

export default MonthlyInvoiceBody
