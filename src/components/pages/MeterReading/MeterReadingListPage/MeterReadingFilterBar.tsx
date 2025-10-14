import { ZapOff } from 'lucide-react'
import { type ChangeEvent, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { SearchBar } from '@/components/feature'
import { LoadingPage } from '@/components/ui'
import { useRentoraApiBuildingListNoPaginate } from '@/hooks'
import type { IBuilding, IReadingUnitUtility } from '@/types'

type IMeterReadingFilterBar = {
  handleReadingDateChange: (value: string) => void
  handleBuildingChange: (value: string) => void
  handleNodata: (value: boolean) => void
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  filterDates: Array<IReadingUnitUtility>
  isLoadingFilterDates: boolean
}
const MeterReadingFilterBar = ({
  handleReadingDateChange,
  handleBuildingChange,
  handleNodata,
  filterDates,
  isLoadingFilterDates,
  onSearchChange,
}: IMeterReadingFilterBar) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: buildingNames, isLoading: isLoadingBuildingNames } = useRentoraApiBuildingListNoPaginate({
    apartmentId,
  })

  const isLoading: boolean = useMemo(
    () => isLoadingBuildingNames || isLoadingFilterDates,
    [isLoadingBuildingNames, isLoadingFilterDates],
  )

  if (isLoading) {
    return <LoadingPage />
  }

  if (!filterDates || filterDates.length === 0) {
    handleNodata(true)
    return (
      <Card className="shadow- flex h-80 flex-col items-center rounded-2xl p-6">
        <ZapOff size={32} className="text-theme-distribution" />
        <div className="flex flex-col items-center">
          <h4 className="text-center">No Meter Readings Yet</h4>
          <p className="text-body-2 text-theme-secondary text-center">
            Start by creating a new meter reading to see your records here.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="rounded-2xl p-6">
      <div className="desktop:flex-row desktop:items-center flex flex-col items-start gap-x-2 gap-y-2">
        {/* Filter room */}
        <SearchBar onChange={onSearchChange} placeholder="Search by room number" />
        {/* Date filter */}
        <Select onValueChange={handleReadingDateChange} disabled={isLoadingFilterDates}>
          <SelectTrigger>
            <SelectValue placeholder="Select a date" />
          </SelectTrigger>
          <SelectContent>
            {filterDates?.map((date: IReadingUnitUtility) => (
              <SelectItem key={date.readingDate} value={date.readingDate}>
                {date.readingDate}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Building filter */}
        <Select onValueChange={handleBuildingChange} disabled={isLoadingBuildingNames}>
          <SelectTrigger>
            <SelectValue placeholder="Select a building" />
          </SelectTrigger>
          <SelectContent>
            {buildingNames?.map((building: IBuilding) => (
              <SelectItem key={building.name} value={building.name}>
                {building.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  )
}

export default MeterReadingFilterBar
