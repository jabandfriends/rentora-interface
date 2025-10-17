import { useDebounce } from '@uidotdev/usehooks'
import { FileBadge, FileSpreadsheet, FileWarning, FileX, Plus } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common'
import { MonthlyInvoiceBody } from '@/components/pages/Invoice'
import { PageTableHeader, PageTableSearch } from '@/components/ui'
import { DEFAULT_MAINTENANCE_LIST_DATA, DEFAULT_UNIT_LIST_DATA, ROUTES } from '@/constants'
import { MonthlyInvoicePaymentStatus } from '@/enum'
import { useRentoraMonthlyInvoiceList } from '@/hooks'
import type { ISearchBarProps, IStatsCardProps, Maybe } from '@/types'

const MonthlyInvoice = () => {
  const navigate: NavigateFunction = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_MAINTENANCE_LIST_DATA.page,
  )

  const { watch, setValue } = useForm({
    defaultValues: {
      sortBy: '',
      sortDir: '',
      unitName: '',
      buildingName: '',
      paymentStatus: undefined,
    },
  })

  const [unitName, buildingName, paymentStatus]: [string, string, Maybe<MonthlyInvoicePaymentStatus>] = watch([
    'unitName',
    'buildingName',
    'paymentStatus',
  ])

  const debouncedSearch = useDebounce(unitName || undefined, 500)
  const debouncedBuildingName = useDebounce(buildingName || undefined, 500)

  const {
    data: invoices,
    pagination: { totalPages, totalElements },
    metadata: {
      totalMonthlyInvoices,
      totalUnpaidMonthlyInvoices,
      totalPaidMonthlyInvoices,
      totalOverdueMonthlyInvoice,
    },
    isLoading,
  } = useRentoraMonthlyInvoiceList(apartmentId, {
    page: currentPage,
    size: DEFAULT_MAINTENANCE_LIST_DATA.size,
    unitName: debouncedSearch,
    buildingName: debouncedBuildingName,
    paymentStatus: paymentStatus,
  })

  const handlePageChange = useCallback((page: number) => {
    if (page < 1) return
    setCurrentPage(page)
  }, [])

  const handleSearchChange: ISearchBarProps['onChange'] = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('unitName', value)
      setCurrentPage(DEFAULT_UNIT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const monthlyInvoiceStats: Array<IStatsCardProps> = [
    {
      title: 'Total Invoices',
      icon: <FileSpreadsheet />,
      type: 'primary',
      count: totalMonthlyInvoices,
    },

    {
      title: 'Paid Invoices',
      type: 'success',
      count: totalPaidMonthlyInvoices,
      icon: <FileBadge />,
    },
    {
      title: 'Unpaid Invoices',
      type: 'warning',
      count: totalUnpaidMonthlyInvoices,
      icon: <FileWarning />,
    },
    {
      title: 'Overdue Invoices',
      type: 'error',
      count: totalOverdueMonthlyInvoice,
      icon: <FileX />,
    },
  ]
  return (
    <>
      <PageTableHeader
        title="Monthly Invoices"
        description="Manage monthly rent invoices"
        stats={monthlyInvoiceStats}
        isLoading={isLoading}
        actionButton={
          <Button
            onClick={() => navigate(ROUTES.monthlyInvoiceCreate.getPath(apartmentId))}
            className="flex items-center gap-2"
          >
            <Plus size={18} /> New Invoice
          </Button>
        }
      />
      <PageTableSearch placeholder="Search invoice by unit name" onSearchChange={handleSearchChange} />
      <MonthlyInvoiceBody
        isLoading={isLoading}
        data={invoices}
        currentPage={currentPage}
        totalElements={totalElements}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  )
}

export default MonthlyInvoice
