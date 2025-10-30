import { Download } from 'lucide-react'
import type { ChangeEvent } from 'react'

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { SearchBar } from '@/components/feature'

type IPageTableSearchProps<StatusEnum extends string, SortEnum extends string> = {
  statusEnum?: Record<string, StatusEnum>
  sortEnum?: Record<string, SortEnum>
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onStatusChange?: (value: StatusEnum) => void
  onSortChange?: (value: SortEnum) => void
  placeholder?: string
}

const PageTableSearch = <StatusEnum extends string, SortEnum extends string>({
  statusEnum,
  sortEnum,
  onSearchChange,
  onStatusChange,
  onSortChange,
  placeholder = 'Search by name',
}: IPageTableSearchProps<StatusEnum, SortEnum>) => {
  return (
    <div className="desktop:flex-row flex flex-col gap-x-4 gap-y-2 rounded-2xl">
      {/* Search */}
      <SearchBar onChange={onSearchChange} placeholder={placeholder} />

      <div className="desktop:flex-row flex flex-col gap-2">
        <div className="flex gap-2">
          {/* Status Dropdown */}
          {statusEnum && (
            <Select onValueChange={onStatusChange}>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent align="start" sideOffset={10}>
                {Object.entries(statusEnum).map(([key, value]) => (
                  <SelectItem className="capitalize" key={key} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Sort By Dropdown */}
          {sortEnum && (
            <Select onValueChange={onSortChange}>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent align="start" sideOffset={10}>
                {Object.entries(sortEnum).map(([key, value]) => (
                  <SelectItem className="capitalize" value={value} key={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Export PDF */}
        <Button className="flex items-center gap-2">
          <Download size={18} /> Export PDF
        </Button>
      </div>
    </div>
  )
}

export default PageTableSearch
