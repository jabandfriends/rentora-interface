import { useDebounce } from '@uidotdev/usehooks'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Card } from '@/components/common'
import { PageTableHeader } from '@/components/ui'
import { DEFAULT_INVOICE_LIST_DATA } from '@/constants'
import { ADHOC_INVOICE_CATEGORY, ADHOC_INVOICE_PAYMENT_STATUS } from '@/enum'
import { useRentoraApiTenantAdhocInvoiceList, useRentoraApiUser } from '@/hooks'

import TenantAdhocInvoiceFiltering from './TenantAdhocInvoiceFiltering'
import TenantAdhocInvoiceSection from './TenantAdhocInvoiceSection'

const TenantAdhocInvoiceList = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: userData } = useRentoraApiUser()
  const tenantUserId = userData?.id

  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_INVOICE_LIST_DATA.page,
  )
  const { watch, setValue, reset } = useForm({
    defaultValues: {
      status: '' as ADHOC_INVOICE_PAYMENT_STATUS,
      category: '' as ADHOC_INVOICE_CATEGORY,
    },
  })

  const [status, category]: [ADHOC_INVOICE_PAYMENT_STATUS, ADHOC_INVOICE_CATEGORY] = watch(['status', 'category'])

  const debouncedStatus = useDebounce(status ? status : undefined, 300)
  const debouncedCategory = useDebounce(category ? category : undefined, 300)
  const handleStatusChange = useCallback(
    (value: ADHOC_INVOICE_PAYMENT_STATUS) => {
      setValue('status', value)
      setCurrentPage(DEFAULT_INVOICE_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleCategoryChange = useCallback(
    (value: ADHOC_INVOICE_CATEGORY) => {
      setValue('category', value)
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
    isLoading: isLoadingAdhocInvoiceList,
    pagination: { totalPages, totalElements },
  } = useRentoraApiTenantAdhocInvoiceList({
    apartmentId: apartmentId!,
    tenantUserId: tenantUserId!,
    params: {
      page: currentPage,
      size: DEFAULT_INVOICE_LIST_DATA.size,
      status: debouncedStatus,
      category: debouncedCategory,
    },
  })

  const handleClearFilters = useCallback(() => {
    reset()
    setCurrentPage(DEFAULT_INVOICE_LIST_DATA.page)
  }, [reset, setCurrentPage])

  return (
    <Card className="justify-start space-y-4 rounded-xl shadow">
      <PageTableHeader
        title="Adhoc Invoices"
        description="Here you can view and keep track of all additional invoices assigned to you as a tenant. This includes miscellaneous charges outside of your regular rent. Stay updated and make sure you don't miss any outstanding payments."
      />

      <TenantAdhocInvoiceFiltering
        isLoadingAdhocInvoiceList={isLoadingAdhocInvoiceList}
        handleStatusChange={handleStatusChange}
        handleCategoryChange={handleCategoryChange}
        handleClearFilters={handleClearFilters}
      />
      <TenantAdhocInvoiceSection
        invoiceList={invoiceList}
        isLoading={isLoadingAdhocInvoiceList}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
        totalElements={totalElements}
      />
    </Card>
  )
}

export default TenantAdhocInvoiceList
