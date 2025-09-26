import { ChevronDown, Download } from 'lucide-react'
import type { ChangeEvent } from 'react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/common'
import { SearchBar } from '@/components/feature'

type IPageTableSearchProps<StatusEnum extends string, SortEnum extends string> = {
  selectedStatus?: StatusEnum
  selectedSort?: SortEnum
  statusEnum: Record<string, StatusEnum>
  sortEnum: Record<string, SortEnum>
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onStatusChange: (value: StatusEnum) => void
  onSortChange: (value: SortEnum) => void
}

const PageTableSearch = <StatusEnum extends string, SortEnum extends string>({
  statusEnum,
  sortEnum,
  onSearchChange,
  onStatusChange,
  onSortChange,
}: IPageTableSearchProps<StatusEnum, SortEnum>) => {
  return (
    <div className="bg-theme-light desktop:flex-row flex flex-col gap-x-4 gap-y-2 rounded-2xl px-4 py-4">
      {/* Search */}
      <SearchBar onChange={onSearchChange} />

      <div className="desktop:flex-row flex flex-col gap-2">
        <div className="flex gap-2">
          {/* Status Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outlineSecondary" className="flex items-center gap-2">
                <ChevronDown size={18} /> Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={10}>
              {Object.entries(statusEnum).map(([key, value]) => (
                <DropdownMenuItem onSelect={() => onStatusChange(value)} key={key}>
                  {key}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort By Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outlineSecondary" className="flex items-center gap-2">
                <ChevronDown size={18} />
                Sort By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={10}>
              {Object.entries(sortEnum).map(([key, value]) => (
                <DropdownMenuItem onSelect={() => onSortChange(value)} key={value}>
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

export default PageTableSearch
