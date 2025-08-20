import { ChevronDown, Download, Search } from 'lucide-react'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
} from '@/components/common'
import { INVOICE_SORT, INVOICE_STATUS } from '@/constants'

const PageTableSearch = () => {
  return (
    <div className="bg-theme-light desktop:flex-row flex flex-col gap-x-4 gap-y-2 rounded-2xl px-4 py-4">
      {/* Search */}
      <Input placeholder="Search by invoice " prefix={<Search className="text-theme-secondary-400" />} />

      <div className="flex gap-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outlineSecondary" className="flex items-center gap-2">
              <ChevronDown size={18} /> Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={10}>
            {INVOICE_STATUS.map((status) => (
              <DropdownMenuItem key={status}>{status}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort By */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outlineSecondary" className="flex items-center gap-2">
              <ChevronDown size={18} /> Sort By
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={10}>
            {INVOICE_SORT.map((sort) => (
              <DropdownMenuItem key={sort}>{sort}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Export PDF */}
      </div>
      <Button className="flex items-center gap-2">
        <Download size={18} />
        Export PDF
      </Button>
    </div>
  )
}

export default PageTableSearch
