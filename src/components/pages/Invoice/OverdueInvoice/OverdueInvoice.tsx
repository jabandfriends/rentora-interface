import { useDebounce } from '@uidotdev/usehooks'
import { CircleAlert } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { OverdueInvoiceTable } from '@/components/pages/Invoice'
import { PageTableBody, PageTableHeader } from '@/components/ui'
import PageTableSearchWithoutStatus from '@/components/ui/PageTable/PageTableSearchWithoutStatus'
import { DEFAULT_INVOICE_LIST_DATA } from '@/constants'
import { useRentoraApiOverdueInvoiceList } from '@/hooks'
import type { ISearchBarProps, IStatsCardProps } from '@/types'

const OverdueInvoice = () => {
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState<number>(
    DEFAULT_INVOICE_LIST_DATA.page,
  )
  //param
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { watch, setValue } = useForm<{
    search: string
    sortBy: 'createdAt' | 'updatedAt' | undefined
    sortDir: 'asc' | 'desc' | undefined
  }>({
    defaultValues: {
      search: '',
      sortBy: undefined,
      sortDir: undefined,
    },
  })

  const [search, sortBy, sortDir]: [string, 'createdAt' | 'updatedAt' | undefined, 'asc' | 'desc' | undefined] = watch([
    'search',
    'sortBy',
    'sortDir',
  ])

  const debouncedSearch = useDebounce(search ? search : undefined, 150)
  const debouncedSortBy = useDebounce(sortBy ? sortBy : undefined, 300)
  const debouncedSortDir = useDebounce(sortDir ? sortDir : undefined, 300)

  const {
    data: invoiceData,
    isLoading,
    pagination: { totalPages, totalElements },
    metadata: { overdueInvoice },
  } = useRentoraApiOverdueInvoiceList({
    apartmentId: apartmentId,
    params: {
      page: currentPage,
      size: DEFAULT_INVOICE_LIST_DATA.size,
      search: debouncedSearch,
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

  const handleSortChange = useCallback(
    (value: 'createdAt' | 'updatedAt') => {
      setValue('sortBy', value)
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

  const isSearched: boolean = useMemo(
    () => !!debouncedSearch || !!debouncedSortBy || !!debouncedSortDir,
    [debouncedSearch, debouncedSortBy, debouncedSortDir],
  )

  const overdueInvoiceStats: Array<IStatsCardProps> = useMemo(
    () => [
      {
        title: 'Overdue Invoices',
        count: overdueInvoice,
        type: 'error',
        icon: <CircleAlert size={22} />,
      },
    ],
    [overdueInvoice],
  )
  enum INVOICE_SORT {
    CreatedAt = 'createdAt',
    UpdatedAt = 'updatedAt',
  }
  return (
    <PageTableBody className="space-y-8">
      <PageTableHeader
        title="Overdue Invoices Management"
        description="Manage unpaid bills and outstanding invoices for this apartment"
        stats={overdueInvoiceStats}
      />
      <PageTableSearchWithoutStatus
        selectedSort={watch('sortBy')}
        sortEnum={INVOICE_SORT}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />
      <OverdueInvoiceTable
        isSearched={isSearched}
        data={invoiceData}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
      />
    </PageTableBody>
  )
}

export default OverdueInvoice
