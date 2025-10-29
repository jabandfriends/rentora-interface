import { useDebounce } from '@uidotdev/usehooks'
import { Droplet, Zap } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { ElectricWaterReportTable } from '@/components/pages/Report/ElectricWaterReport'
import { PageTableBar, PageTableBody, PageTableHeader } from '@/components/ui'
import { DEFAULT_REPORT_UTILITY_LIST_DATA } from '@/constants'
import { useRentoraApiReportReadingDateUtility, useRentoraApiReportUtility } from '@/hooks'
import type { ISearchBarProps, IStatsCardProps, Maybe } from '@/types'
import { formatCurrency } from '@/utilities'

import ElectricWaterSearchBar from './ElectricWaterSearchBar'

const ElectricWaterReport = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_REPORT_UTILITY_LIST_DATA.page,
  )

  //date data
  const { data: readingDateUtility } = useRentoraApiReportReadingDateUtility({ apartmentId })
  const { watch, setValue } = useForm({
    defaultValues: {
      unitName: '',
      sortDir: '',
      readingDate: '',
    },
  })

  const [unitName, sortDir, readingDate]: [string, string, Maybe<string>] = watch([
    'unitName',
    'sortDir',
    'readingDate',
  ])

  const debouncedUnitName = useDebounce(unitName ? unitName : undefined, 500)
  const debouncedSortDir = useDebounce(sortDir ? sortDir : undefined, 300)
  const debouncedReadingDate = useDebounce(readingDate ? readingDate : undefined, 300)

  //data
  const {
    data: reportUtilityList,
    isLoading,
    pagination: { totalPages, totalElements },
    metadata: { totalAmount, electricUsagePrices, waterUsagePrices },
  } = useRentoraApiReportUtility({
    apartmentId: apartmentId,
    params: {
      page: currentPage,
      size: DEFAULT_REPORT_UTILITY_LIST_DATA.size,
      unitName: debouncedUnitName,
      sortDir: debouncedSortDir,
      readingDate: debouncedReadingDate,
    },
    enabled: !!apartmentId && !!readingDate,
  })

  const isSearched: boolean = useMemo(
    () => !!debouncedUnitName || !!debouncedSortDir,
    [debouncedUnitName, debouncedSortDir],
  )

  const isReadingDateSelected: boolean = useMemo(() => !!debouncedReadingDate, [debouncedReadingDate])

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) return
      setCurrentPage(page)
    },
    [setCurrentPage],
  )

  const handleSearchChange = useCallback(
    ({ target: { value } }: Parameters<ISearchBarProps['onChange']>[0]) => {
      setValue('unitName', value)
      setCurrentPage(DEFAULT_REPORT_UTILITY_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleSortChange = useCallback(
    (value: string) => {
      setValue('sortDir', value)
      setCurrentPage(DEFAULT_REPORT_UTILITY_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleReadingDateChange = useCallback(
    (value: string) => {
      setValue('readingDate', value)
      setCurrentPage(DEFAULT_REPORT_UTILITY_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const utilityReportStats: Array<IStatsCardProps> = useMemo(() => {
    return [
      {
        title: 'Electric usage',
        count: formatCurrency(electricUsagePrices),
        icon: <Zap size={22} />,
        type: 'warning',
      },
      {
        title: 'Water usage',
        count: formatCurrency(waterUsagePrices),
        icon: <Droplet size={22} />,
        type: 'primary',
      },
    ]
  }, [electricUsagePrices, waterUsagePrices])

  return (
    <PageTableBody className="space-y-8">
      <PageTableHeader
        title="Electric & Water Usage"
        description="Manage and view electric & water usage and bills"
        stats={utilityReportStats}
        isLoading={isLoading}
      />
      <PageTableBar title="Total Utility Amount" isLoading={isLoading} count={`${formatCurrency(totalAmount)}`} />
      <ElectricWaterSearchBar
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        sortEnum={{ Ascending: 'asc', Descending: 'desc' }}
        readingDateUtility={readingDateUtility}
        onReadingDateChange={handleReadingDateChange}
      />
      <ElectricWaterReportTable
        data={reportUtilityList}
        isLoading={isLoading}
        isSearched={isSearched}
        isReadingDateSelected={isReadingDateSelected}
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
      />
    </PageTableBody>
  )
}

export default ElectricWaterReport
