import { XIcon } from 'lucide-react'

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { ADHOC_INVOICE_CATEGORY, ADHOC_INVOICE_PAYMENT_STATUS } from '@/enum'

type ITenantAdhocInvoiceFilteringProps = {
  isLoadingAdhocInvoiceList: boolean
  handleStatusChange: (value: ADHOC_INVOICE_PAYMENT_STATUS) => void
  handleCategoryChange: (value: ADHOC_INVOICE_CATEGORY) => void
  handleClearFilters: () => void
}
const TenantAdhocInvoiceFiltering = ({
  isLoadingAdhocInvoiceList,
  handleStatusChange,
  handleCategoryChange,
  handleClearFilters,
}: ITenantAdhocInvoiceFilteringProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <Select disabled={isLoadingAdhocInvoiceList} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[180px] capitalize">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {Object.entries(ADHOC_INVOICE_PAYMENT_STATUS).map(([key, value]) => (
              <SelectItem className="capitalize" key={key} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select disabled={isLoadingAdhocInvoiceList} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px] capitalize">
            <SelectValue placeholder="All Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Category</SelectItem>
            {Object.entries(ADHOC_INVOICE_CATEGORY).map(([key, value]) => (
              <SelectItem className="capitalize" key={key} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        disabled={isLoadingAdhocInvoiceList}
        className="flex items-center"
        size="icon"
        variant="outline"
        onClick={handleClearFilters}
      >
        <XIcon />
      </Button>
    </div>
  )
}

export default TenantAdhocInvoiceFiltering
