import type { ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'

import { Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { SearchBar } from '@/components/feature'
import { useRentoraApiBuildingListNoPaginate, useRentoraApiReportReadingDateUtility } from '@/hooks'
import type { IBuilding, IReadingUnitUtility } from '@/types'

type IMeterReadingFilterBar = {
  handleReadingDateChange: (value: string) => void
  handleBuildingChange: (value: string) => void
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const MeterReadingFilterBar = ({
  handleReadingDateChange,
  handleBuildingChange,
  onSearchChange,
}: IMeterReadingFilterBar) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: buildingNames, isLoading: isLoadingBuildingNames } = useRentoraApiBuildingListNoPaginate({
    apartmentId,
  })
  const { data: filterDates, isLoading: isLoadingFilterDates } = useRentoraApiReportReadingDateUtility({
    apartmentId,
  })

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
