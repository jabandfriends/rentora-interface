import { SelectValue } from '@radix-ui/react-select'
import { Download } from 'lucide-react'
import type { ChangeEvent } from 'react'

import { Button, Select, SelectContent, SelectItem, SelectTrigger } from '@/components/common'
import { SearchBar } from '@/components/feature'

type IPageTableSearchWithoutStatusProps<SortEnum extends string> = {
  selectedSort?: SortEnum
  sortEnum: Record<string, SortEnum>
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSortChange: (value: SortEnum) => void
}

const PageTableSearchWithoutStatus = <SortEnum extends string>({
  sortEnum,
  onSearchChange,
  onSortChange,
}: IPageTableSearchWithoutStatusProps<SortEnum>) => {
  return (
    <div className="bg-theme-light desktop:flex-row flex flex-col gap-x-4 gap-y-2 rounded-2xl">
      {/* Search */}
      <SearchBar onChange={onSearchChange} />

      <div className="desktop:flex-row flex flex-col gap-2">
        <div className="flex gap-2">
          {/* Sort By Dropdown */}
          <Select onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(sortEnum).map(([key, value]) => (
                <SelectItem key={value} value={value}>
                  {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Export PDF */}
        <Button className="flex items-center gap-2">
          <Download size={18} /> Export PDF
        </Button>
      </div>
    </div>
  )
}

export default PageTableSearchWithoutStatus
