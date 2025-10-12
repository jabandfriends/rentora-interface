import { AlertCircle, CheckCircle, DollarSign, XCircle } from 'lucide-react'
import { type ChangeEvent, type Dispatch, type SetStateAction, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/common'
import { ReceiptReportTable } from '@/components/pages/Report/ReceiptReport'
import { PageTableHeader } from '@/components/ui'
import { DEFAULT_REPORT_RECEIPT_LIST_DATA } from '@/constants'
import { useRentoraApiReportReceipt } from '@/hooks'
import type { IStatsCardProps } from '@/types'

import ReceiptReportSearchBar from './ReceiptReportSearchBar'

const ReceiptReport = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_REPORT_RECEIPT_LIST_DATA.page,
  )
  //data
  const {
    data: receiptReportList,
    isLoading,
    pagination,
    metadata,
  } = useRentoraApiReportReceipt({
    enabled: !!apartmentId,
    apartmentId,
    params: {
      page: currentPage,
      size: 10,
      sortBy: 'invoiceDate',
      sortDir: 'desc',
      search: '',
    },
  })

  const receiptReportStats: Array<IStatsCardProps> = useMemo(() => {
    return [
      {
        title: 'Total Bills',
        count: metadata?.totalBill ?? 0,
        icon: <DollarSign size={22} />,
        type: 'primary',
      },
      {
        title: 'Paid',
        count: metadata?.receiptPaid ?? 0,
        icon: <CheckCircle size={22} />,
        type: 'success',
      },
      {
        title: 'Unpaid',
        count: metadata?.receiptUnpaid ?? 0,
        icon: <XCircle size={22} />,
        type: 'error',
      },
      {
        title: 'Overdue',
        count: metadata?.receiptOverdue ?? 0,
        icon: <AlertCircle size={22} />,
        type: 'warning',
      },
    ]
  }, [metadata])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleSearchChange(_e: ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.')
  }
  function handleSortChange(value: string): void {
    // eslint-disable-next-line no-console
    console.log('Sort changed:', value)
  }

  return (
    <>
      <PageTableHeader
        title="Receipt Report"
        description="Manage and view all customer receipt"
        stats={receiptReportStats}
        actionButton={
          <Button className="flex items-center gap-2">
            {/* You may want to use an icon here, e.g. DollarSign or Plus */}
            <DollarSign size={18} /> New Receipt
          </Button>
        }
      />
      <ReceiptReportSearchBar
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        sortEnum={{ Ascending: 'asc', Descending: 'desc' }}
      />
      <ReceiptReportTable
        data={receiptReportList ?? []}
        isLoading={isLoading}
        isSearched={false}
        currentPage={pagination?.page ?? 1}
        totalPages={pagination?.totalPages ?? 0}
        totalElements={pagination?.totalElements ?? 0}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </>
  )
}

export default ReceiptReport
