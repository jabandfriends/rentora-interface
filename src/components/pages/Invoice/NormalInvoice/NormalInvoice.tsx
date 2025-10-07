import { useDebounce } from '@uidotdev/usehooks'
import { CircleAlert, CircleCheckBig, Clock, DollarSign, Plus } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common'
import { NormalInvoiceTable } from '@/components/pages/Invoice'
import { PageTableHeader, PageTableSearch } from '@/components/ui'
import { DEFAULT_INVOICE_LIST_DATA, INVOICE_STATUS, ROUTES } from '@/constants'
import { useRentoraApiInvoiceList } from '@/hooks'
import type { ISearchBarProps, IStatsCardProps } from '@/types'

const NormalInvoice = () => {
  const navigate: NavigateFunction = useNavigate()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState<number>(
    DEFAULT_INVOICE_LIST_DATA.page,
  )

  //param
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { watch, setValue } = useForm<{
    search: string
    status: string
    sortBy: 'createdAt' | 'updatedAt'
    sortDir: 'asc' | 'desc'
  }>({
    defaultValues: {
      search: '',
      status: '',
      sortBy: 'createdAt',
      sortDir: 'desc',
    },
  })

  const [search, status, sortBy, sortDir]: [string, string, 'createdAt' | 'updatedAt', 'asc' | 'desc'] = watch([
    'search',
    'status',
    'sortBy',
    'sortDir',
  ])

  const debouncedSearch = useDebounce(search ? search : undefined, 500)
  const debouncedStatus = useDebounce(status ? status : undefined, 300)
  const debouncedSortBy = useDebounce(sortBy ? sortBy : undefined, 300)
  const debouncedSortDir = useDebounce(sortDir ? sortDir : undefined, 300)

  const {
    data: invoiceData,
    isLoading,
    pagination: { totalPages, totalElements },
    metadata: { totalInvoice, paidInvoice, unpaidInvoice, overdueInvoice },
  } = useRentoraApiInvoiceList({
    apartmentId: apartmentId,
    params: {
      page: currentPage,
      size: DEFAULT_INVOICE_LIST_DATA.size,
      search: debouncedSearch,
      status: debouncedStatus,
      sortBy: debouncedSortBy,
      sortDir: debouncedSortDir,
    },
  })

  const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('search', value)
      setCurrentPage(DEFAULT_INVOICE_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleStatusChange = useCallback(
    (value: string) => {
      setValue('status', value)
      setCurrentPage(DEFAULT_INVOICE_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleSortChange = useCallback(
    (value: 'createdAt' | 'updatedAt') => {
      setValue('sortBy', value)
      setCurrentPage(DEFAULT_INVOICE_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const navigateToCreateInvoice = useCallback(() => {
    navigate(ROUTES.invoiceCreate.getPath(apartmentId))
  }, [apartmentId, navigate])

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) return
      setCurrentPage(page)
    },
    [setCurrentPage],
  )

  const isSearched: boolean = useMemo(
    () => !!debouncedSearch || !!debouncedSortBy || !!debouncedSortDir || !!debouncedStatus,
    [debouncedSearch, debouncedSortBy, debouncedSortDir, debouncedStatus],
  )

  const invoiceStats: Array<IStatsCardProps> = useMemo(
    () => [
      {
        title: 'Total Invoices',
        count: totalInvoice,
        type: 'primary',
        icon: <DollarSign size={22} />,
      },
      {
        title: 'Paid Invoices',
        count: paidInvoice,
        type: 'success',
        icon: <CircleCheckBig size={22} />,
      },
      {
        title: 'Unpaid Invoices',
        count: unpaidInvoice,
        type: 'warning',
        icon: <Clock size={22} />,
      },
      {
        title: 'Overdue Invoices',
        count: overdueInvoice,
        type: 'error',
        icon: <CircleAlert size={22} />,
      },
    ],
    [totalInvoice, paidInvoice, unpaidInvoice, overdueInvoice],
  )
  enum INVOICE_SORT {
    CreatedAt = 'createdAt',
    UpdatedAt = 'updatedAt',
  }

  return (
    <>
      <PageTableHeader
        title="Invoices Management"
        description="Manage and track all custom invoices and payments"
        stats={invoiceStats}
        isLoading={isLoading}
        actionButton={
          <Button className="flex items-center gap-2" onClick={navigateToCreateInvoice}>
            <Plus size={18} /> New Invoice
          </Button>
        }
      />
      <PageTableSearch
        selectedStatus={status}
        selectedSort={sortBy}
        statusEnum={INVOICE_STATUS}
        sortEnum={INVOICE_SORT}
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
      />
      <NormalInvoiceTable
        isSearched={isSearched}
        data={invoiceData}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default NormalInvoice
