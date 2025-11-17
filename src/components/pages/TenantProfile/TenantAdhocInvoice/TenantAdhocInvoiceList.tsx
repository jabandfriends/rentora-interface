import { useDebounce } from '@uidotdev/usehooks'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { PaginationBar } from '@/components/feature'
import { EmptyPage, PageTableHeader } from '@/components/ui'
import { DEFAULT_INVOICE_LIST_DATA } from '@/constants'
import { ADHOC_INVOICE_CATEGORY, ADHOC_INVOICE_PAYMENT_STATUS } from '@/enum'
import { useRentoraApiTenantAdhocInvoiceList, useRentoraApiUser } from '@/hooks'
import type { IInvoiceSummary } from '@/types'

import TenantAdhocInvoiceCard from './TenantAdhocInvoiceCard'
import TenantAdhocInvoiceListSkeleton from './TenantAdhocInvoiceListSkeleton'

const TenantAdhocInvoiceList = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: userData } = useRentoraApiUser()
  const tenantUserId = userData?.id

  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_INVOICE_LIST_DATA.page,
  )
  const { watch, setValue } = useForm({
    defaultValues: {
      status: '' as string,
      category: '' as string,
      sortBy: 'createdAt',
      sortDir: 'desc' as 'asc' | 'desc',
    },
  })

  const [status, category, sortBy, sortDir] = watch(['status', 'category', 'sortBy', 'sortDir'])
  const debouncedStatus = useDebounce(status ? status : undefined, 300)
  const debouncedCategory = useDebounce(category ? category : undefined, 300)

  const handleStatusChange = useCallback(
    (value: string) => {
      setValue('status', value === 'all' ? '' : value)
      setCurrentPage(DEFAULT_INVOICE_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleCategoryChange = useCallback(
    (value: string) => {
      setValue('category', value === 'all' ? '' : value)
      setCurrentPage(DEFAULT_INVOICE_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) return
      setCurrentPage(page)
    },
    [setCurrentPage],
  )

  const {
    data: invoiceList,
    isLoading,
    pagination: { totalPages, totalElements },
  } = useRentoraApiTenantAdhocInvoiceList({
    apartmentId: apartmentId!,
    tenantUserId: tenantUserId!,
    params: {
      page: currentPage,
      size: DEFAULT_INVOICE_LIST_DATA.size,
      status: debouncedStatus,
      category: debouncedCategory,
      sortBy,
      sortDir,
    },
  })

  if (isLoading) return <TenantAdhocInvoiceListSkeleton />
  if (!invoiceList || invoiceList.length === 0)
    return <EmptyPage title="No invoices found" description="You don't have any adhoc invoices yet." />

  return (
    <Card className="justify-start space-y-4 rounded-xl shadow">
      <PageTableHeader
        title="Adhoc Invoices"
        description="Here you can view and keep track of all additional invoices assigned to you as a tenant. This includes miscellaneous charges outside of your regular rent. Stay updated and make sure you don't miss any outstanding payments."
      />

      <div className="flex items-center justify-between gap-x-2">
        <Select onValueChange={handleStatusChange} value={status || 'all'}>
          <SelectTrigger className="w-[180px] capitalize">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {Object.entries(ADHOC_INVOICE_PAYMENT_STATUS).map(([key, value]) => (
              <SelectItem className="capitalize" key={key} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={handleCategoryChange} value={category || 'all'}>
          <SelectTrigger className="w-[180px] capitalize">
            <SelectValue placeholder="All Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Category</SelectItem>
            {Object.entries(ADHOC_INVOICE_CATEGORY).map(([key, value]) => (
              <SelectItem className="capitalize" key={key} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="desktop:grid-cols-2 grid gap-4">
        {invoiceList.map((invoice: IInvoiceSummary) => (
          <TenantAdhocInvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
      <PaginationBar
        page={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
      />
    </Card>
  )
}

export default TenantAdhocInvoiceList
