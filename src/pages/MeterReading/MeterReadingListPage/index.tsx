import { useDebounce } from '@uidotdev/usehooks'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button, Spinner } from '@/components/common'
import { PageSection } from '@/components/layout'
import { MeterReadingEmpty, MeterReadingFilterBar, MeterReadingTable } from '@/components/pages/MeterReading'
import { PageTableEmpty, PageTableHeader } from '@/components/ui'
import { DEFAULT_REPORT_UTILITY_LIST_DATA, ROUTES } from '@/constants'
import { useRentoraApiReportReadingDateUtility, useRentoraApiReportUtility } from '@/hooks'
import type { ISearchBarProps, Maybe } from '@/types'

const MeterReadingListPage = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_REPORT_UTILITY_LIST_DATA.page,
  )
  const navigate: NavigateFunction = useNavigate()
  const handleNavigateToCreate = useCallback(() => {
    navigate(ROUTES.meterReadingCreate.getPath(apartmentId))
  }, [apartmentId, navigate])

  //possible reading date

  const { watch, setValue } = useForm({
    defaultValues: {
      unitName: '',
      readingDate: '',
      buildingName: '',
    },
  })

  const [unitName, readingDate, buildingName]: [string, Maybe<string>, Maybe<string>] = watch([
    'unitName',
    'readingDate',
    'buildingName',
  ])

  //filter dates
  const { data: filterDates, isLoading: isLoadingFilterDates } = useRentoraApiReportReadingDateUtility({
    apartmentId,
  })

  const debouncedUnitName = useDebounce(unitName ? unitName : undefined, 500)

  const debouncedReadingDate = useDebounce(readingDate ? readingDate : undefined, 300)

  const debouncedBuildingName = useDebounce(buildingName ? buildingName : undefined, 500)

  //data
  const {
    data: reportUtilityList,
    isLoading: isLoadingReportUtility,
    pagination: { totalPages, totalElements },
  } = useRentoraApiReportUtility({
    apartmentId: apartmentId,
    params: {
      page: currentPage,
      size: DEFAULT_REPORT_UTILITY_LIST_DATA.size,
      unitName: debouncedUnitName,
      readingDate: debouncedReadingDate,
      buildingName: debouncedBuildingName,
    },
    enabled: !!apartmentId && !!readingDate,
  })

  const isSearched: boolean = useMemo(
    () => !!debouncedUnitName || !!debouncedBuildingName,
    [debouncedUnitName, debouncedBuildingName],
  )

  const isReadingDateSelected: boolean = useMemo(() => !!debouncedReadingDate, [debouncedReadingDate])

  const [isNodata, setIsNodata]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false)
  const handleNodata = useCallback(() => {
    setIsNodata(true)
  }, [])
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

  const handleReadingDateChange = useCallback(
    (value: string) => {
      setValue('readingDate', value)
      setCurrentPage(DEFAULT_REPORT_UTILITY_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handleBuildingChange = useCallback(
    (value: string) => {
      setValue('buildingName', value)
      setCurrentPage(DEFAULT_REPORT_UTILITY_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  if (isLoadingFilterDates) {
    return (
      <PageSection>
        <PageTableEmpty
          icon={<Spinner />}
          message="Loading your meter readings..."
          description="Hang tight! This will only take a moment 😊"
        />
      </PageSection>
    )
  }
  if (!filterDates || filterDates.length === 0) {
    return (
      <PageSection>
        <PageTableEmpty
          message="No meter readings found"
          description="It looks like there aren’t any meter readings for this apartment yet."
        />
      </PageSection>
    )
  }

  return (
    <PageSection>
      <PageTableHeader
        title="Meter Readings"
        description="View and manage meter readings by date"
        actionButton={<Button onClick={handleNavigateToCreate}>Create New Reading</Button>}
      />

      {/* Search bar */}
      <MeterReadingFilterBar
        handleReadingDateChange={handleReadingDateChange}
        handleBuildingChange={handleBuildingChange}
        handleNodata={handleNodata}
        filterDates={filterDates}
        isLoadingFilterDates={isLoadingFilterDates}
        onSearchChange={handleSearchChange}
      />

      {/* No date yet */}
      {!isReadingDateSelected && !isNodata && (
        <MeterReadingEmpty filterDate={debouncedReadingDate} filteredReadings={reportUtilityList} />
      )}
      {isReadingDateSelected && !isNodata && (
        <MeterReadingTable
          readingDate={debouncedReadingDate}
          filteredReadings={reportUtilityList}
          isLoading={isLoadingReportUtility}
          isSearch={isSearched}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          totalElements={totalElements}
        />
      )}
    </PageSection>
  )
}

export default MeterReadingListPage
