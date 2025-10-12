import { Download } from 'lucide-react'
import type { ChangeEvent } from 'react'

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { SearchBar } from '@/components/feature'

type IReceiptReportSearchBarProps = {
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSortChange?: (value: string) => void
  sortEnum?: Record<string, string>
}

const ReceiptReportSearchBar = ({ onSearchChange, onSortChange, sortEnum }: IReceiptReportSearchBarProps) => {
  return (
    <div className="bg-theme-light desktop:flex-row flex flex-col gap-x-4 gap-y-2 rounded-2xl px-4 py-4">
      {/* Search */}
      <SearchBar onChange={onSearchChange} />

      <div className="desktop:flex-row flex flex-col gap-2">
        <div className="flex gap-2">
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

        {/* Export PDF */}
        <Button className="flex items-center gap-2">
          <Download size={18} /> Export PDF
        </Button>
      </div>
    </div>
  )
}

export default ReceiptReportSearchBar
