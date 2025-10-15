import { useDebounce } from '@uidotdev/usehooks'
import { AlertCircle, CheckCircle, DollarSign, XCircle } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { ReceiptReportTable } from '@/components/pages/Report/ReceiptReport'
import { PageTableHeader } from '@/components/ui'
import { DEFAULT_REPORT_RECEIPT_LIST_DATA } from '@/constants'
import { useRentoraApiReportReceipt } from '@/hooks'
import type { ISearchBarProps, IStatsCardProps } from '@/types'

import ReceiptReportSearchBar from './ReceiptReportSearchBar'

const ReceiptReport = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_REPORT_RECEIPT_LIST_DATA.page,
  )

  const { watch, setValue } = useForm({
    defaultValues: {
      search: '',
      sortDir: '',
    },
  })

  const [search, sortDir]: [string, string] = watch(['search', 'sortDir'])
  const debouncedSearch = useDebounce(search ? search : undefined, 500)
  const debouncedSortDir = useDebounce(sortDir ? sortDir : undefined, 500)
  //data
  const {
    data: receiptReportList,
    isLoading: isLoadingReceiptReport,
    pagination: { totalPages, totalElements },
    metadata: { totalBill, receiptPaid, receiptUnpaid, receiptOverdue },
  } = useRentoraApiReportReceipt({
    apartmentId,
    params: {
      page: currentPage,
      search: debouncedSearch,
      sortDir: debouncedSortDir,
      size: DEFAULT_REPORT_RECEIPT_LIST_DATA.size,
    },
  })

  const receiptReportStats: Array<IStatsCardProps> = useMemo(() => {
    return [
      {
        title: 'Total Bills',
        count: totalBill,
        icon: <DollarSign size={22} />,
        type: 'primary',
      },
      {
        title: 'Paid',
        count: receiptPaid,
        icon: <CheckCircle size={22} />,
        type: 'success',
      },
      {
        title: 'Unpaid',
        count: receiptUnpaid,
        icon: <XCircle size={22} />,
        type: 'error',
      },
      {
        title: 'Overdue',
        count: receiptOverdue,
        icon: <AlertCircle size={22} />,
        type: 'warning',
      },
    ]
  }, [receiptPaid, receiptUnpaid, receiptOverdue, totalBill])

  const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('search', value)
      setCurrentPage(DEFAULT_REPORT_RECEIPT_LIST_DATA.page)
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

  const handleSortChange = useCallback(
    (value: string) => {
      setValue('sortDir', value)
      setCurrentPage(DEFAULT_REPORT_RECEIPT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const isSearched: boolean = useMemo(() => {
    return !!debouncedSearch
  }, [debouncedSearch])

  return (
    <>
      <PageTableHeader
        title="Receipt Report"
        isLoading={isLoadingReceiptReport}
        description="Manage and view all customer receipt"
        stats={receiptReportStats}
      />
      <ReceiptReportSearchBar
        onSearchChange={handleSearchChange}
        sortEnum={{ Ascending: 'asc', Descending: 'desc' }}
        onSortChange={handleSortChange}
      />
      <ReceiptReportTable
        data={receiptReportList}
        isLoading={isLoadingReceiptReport}
        isSearched={isSearched}
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default ReceiptReport
