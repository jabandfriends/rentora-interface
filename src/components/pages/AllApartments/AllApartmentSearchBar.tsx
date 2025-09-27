import type { ChangeEvent } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { SearchBar } from '@/components/feature'
import { APARTMENT_STATUS } from '@/constants'

export type IAllApartmentSearchBarProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onStatusChange: (value: string) => void
}
const AllApartmentSearchBar = ({ onChange, onStatusChange }: IAllApartmentSearchBarProps) => {
  return (
    <div className="desktop:flex-row flex flex-col items-center gap-2">
      <SearchBar onChange={onChange} />
      <Select onValueChange={onStatusChange}>
        <SelectTrigger className="desktop:w-60 w-full">
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(APARTMENT_STATUS).map(([key, value]) => (
            <SelectItem key={`select-item-${key}`} value={key}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default AllApartmentSearchBar
