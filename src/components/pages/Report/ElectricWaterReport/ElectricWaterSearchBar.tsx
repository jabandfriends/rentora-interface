import type { ChangeEvent } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Spinner } from '@/components/common'
import { SearchBar } from '@/components/feature'
import { PageTableEmpty } from '@/components/ui'
import type { IReadingUnitUtility, Maybe } from '@/types'

type IElectricWaterSearchBarProps = {
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSortChange?: (value: string) => void
  sortEnum?: Record<string, string>
  isLoadingDate?: boolean
  readingDateUtility: Maybe<Array<IReadingUnitUtility>>
  onReadingDateChange?: (value: string) => void
}
const ElectricWaterSearchBar = ({
  onSearchChange,
  onSortChange,
  sortEnum,
  isLoadingDate,
  readingDateUtility,
  onReadingDateChange,
}: IElectricWaterSearchBarProps) => {
  if (isLoadingDate)
    return (
      <PageTableEmpty
        icon={<Spinner />}
        message="Loading your report..."
        description="Hang tight! This will only take a moment 😊"
      />
    )
  if (!readingDateUtility || readingDateUtility.length === 0) {
    return (
      <PageTableEmpty
        className="border-theme-secondary-300 border"
        message="No meter readings found"
        description="It looks like there aren’t any meter readings for this apartment yet."
      />
    )
  }
  return (
    <div className="bg-theme-light desktop:flex-row flex flex-col gap-x-4 gap-y-2 rounded-2xl px-4 py-4">
      {/* Search */}
      <SearchBar onChange={onSearchChange} />

      <div className="desktop:flex-row flex flex-col gap-2">
        <div className="flex gap-2">
          {/* Sort By Dropdown */}
          <Select onValueChange={onReadingDateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Date" />
            </SelectTrigger>
            <SelectContent>
              {readingDateUtility.map((item: IReadingUnitUtility) => (
                <SelectItem key={item.readingDate} value={item.readingDate}>
                  {item.readingDate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {sortEnum && (
            <Select onValueChange={onSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Sort" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(sortEnum).map(([key, value]) => (
                  <SelectItem key={value} value={value}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
  )
}

export default ElectricWaterSearchBar
