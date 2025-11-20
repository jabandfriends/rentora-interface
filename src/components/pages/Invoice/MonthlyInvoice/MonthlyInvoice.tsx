import { useDebounce } from '@uidotdev/usehooks'
import { FileBadge, FileSpreadsheet, FileWarning, FileX, Plus } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common'
import { MonthlyInvoiceBody } from '@/components/pages/Invoice'
import { PageTableBody, PageTableHeader } from '@/components/ui'
import { DEFAULT_MAINTENANCE_LIST_DATA, DEFAULT_UNIT_LIST_DATA, ROUTES } from '@/constants'
import { MonthlyInvoicePaymentStatus } from '@/enum'
import { useRentoraApiReportReadingDateUtility, useRentoraMonthlyInvoiceList } from '@/hooks'
import type { IReadingUnitUtility, ISearchBarProps, IStatsCardProps, Maybe } from '@/types'

import { MonthlyInvoiceSearch } from './MonthlyInvoiceSearch'

const MonthlyInvoice = () => {
  const navigate: NavigateFunction = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_MAINTENANCE_LIST_DATA.page,
  )

  //reading date
  const { data: readingDateUtility, isLoading: isLoadingReadingDateUtility } = useRentoraApiReportReadingDateUtility({
    apartmentId,
  })
  const { watch, setValue } = useForm({
    defaultValues: {
      sortBy: '',
      sortDir: '',
      unitName: '',
      buildingName: '',
      paymentStatus: undefined,
      genMonth: '',
    },
  })

  const [unitName, buildingName, paymentStatus, genMonth]: [
    string,
    string,
    Maybe<MonthlyInvoicePaymentStatus>,
    string,
  ] = watch(['unitName', 'buildingName', 'paymentStatus', 'genMonth'])

  const debouncedSearch = useDebounce(unitName || undefined, 150)
  const debouncedBuildingName = useDebounce(buildingName || undefined, 500)
  const debouncedGenMonth = useDebounce(genMonth || undefined, 500)

  const {
    data: invoices,
    pagination: { totalPages, totalElements },
    metadata: {
      totalMonthlyInvoices,
      totalUnpaidMonthlyInvoices,
      totalPaidMonthlyInvoices,
      totalOverdueMonthlyInvoice,
    },
    isLoading: isLoadingMonthlyInvoiceList,
  } = useRentoraMonthlyInvoiceList(apartmentId, {
    page: currentPage,
    size: DEFAULT_MAINTENANCE_LIST_DATA.size,
    unitName: debouncedSearch,
    buildingName: debouncedBuildingName,
    paymentStatus: paymentStatus,
    genMonth: debouncedGenMonth!,
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

  const handleGenMonthChange = useCallback(
    (value: string) => {
      setValue('genMonth', value)
      setCurrentPage(DEFAULT_MAINTENANCE_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const isLoading: boolean = useMemo(
    () => isLoadingMonthlyInvoiceList || isLoadingReadingDateUtility,
    [isLoadingMonthlyInvoiceList, isLoadingReadingDateUtility],
  )

  const isSearching: boolean = useMemo(() => debouncedSearch !== undefined, [debouncedSearch])

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
    <PageTableBody className="space-y-8">
      <PageTableHeader
        title="Monthly Invoices Management"
        description="Easily track, create and manage monthly rent invoices for this apartment"
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
      <MonthlyInvoiceSearch
        onSearchChange={handleSearchChange}
        handleGenMonthChange={handleGenMonthChange}
        readingDateUtility={readingDateUtility ?? ([] as Array<IReadingUnitUtility>)}
        selectedGenMonth={debouncedGenMonth!}
      />

      <MonthlyInvoiceBody
        isSearching={isSearching}
        selectedGenMonth={debouncedGenMonth!}
        isLoading={isLoading}
        data={invoices}
        currentPage={currentPage}
        totalElements={totalElements}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </PageTableBody>
  )
}

export default MonthlyInvoice
