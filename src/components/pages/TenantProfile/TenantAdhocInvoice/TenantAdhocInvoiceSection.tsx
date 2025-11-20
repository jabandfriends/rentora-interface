import { PaginationBar } from '@/components/feature'
import { EmptyPage } from '@/components/ui'
import type { IInvoiceSummary, IPaginate } from '@/types'

import TenantAdhocInvoiceCard from './TenantAdhocInvoiceCard'
import TenantAdhocInvoiceListSkeleton from './TenantAdhocInvoiceListSkeleton'

type ITenantAdhocInvoiceSectionProps = {
  invoiceList: Array<IInvoiceSummary>
  isLoading: boolean
  currentPage: number
  onPageChange: (page: number) => void
} & Pick<IPaginate, 'totalPages' | 'totalElements'>
const TenantAdhocInvoiceSection = ({
  invoiceList,
  isLoading,
  currentPage,
  onPageChange,
  totalPages,
  totalElements,
}: ITenantAdhocInvoiceSectionProps) => {
  if (isLoading) return <TenantAdhocInvoiceListSkeleton />

  if (!invoiceList || invoiceList.length === 0)
    return <EmptyPage title="No invoices found" description="You don't have any adhoc invoices yet." />

  return (
    <div>
      <div className="desktop:grid-cols-2 grid gap-4">
        {invoiceList.map((invoice: IInvoiceSummary) => (
          <TenantAdhocInvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
      <PaginationBar
        page={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default TenantAdhocInvoiceSection
