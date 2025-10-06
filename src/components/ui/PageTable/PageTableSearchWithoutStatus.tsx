import { ChevronDown, Download } from 'lucide-react'
import type { ChangeEvent } from 'react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'
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
  selectedSort,
}: IPageTableSearchWithoutStatusProps<SortEnum>) => {
  return (
    <div className="bg-theme-light desktop:flex-row flex flex-col gap-x-4 gap-y-2 rounded-2xl px-4 py-4">
      {/* Search */}
      <SearchBar onChange={onSearchChange} />

      <div className="desktop:flex-row flex flex-col gap-2">
        <div className="flex gap-2">
          {/* Sort By Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outlineSecondary" className="flex items-center gap-2">
                <ChevronDown size={18} />
                {selectedSort || 'Sort By'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={10}>
              {Object.entries(sortEnum).map(([key, value]) => (
                <DropdownMenuItem onSelect={() => onSortChange?.(value)} key={value}>
                  {key}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
