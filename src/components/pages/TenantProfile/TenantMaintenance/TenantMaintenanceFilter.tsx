import { XIcon } from 'lucide-react'

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { MAINTENANCE_STATUS } from '@/enum'

type ITenantMaintenanceFilterProps = {
  isLoadingMaintenanceList: boolean
  handleStatusChange: (value: MAINTENANCE_STATUS) => void
  handleClearFilters: () => void
}
const TenantMaintenanceFilter = ({
  handleStatusChange,
  isLoadingMaintenanceList,
  handleClearFilters,
}: ITenantMaintenanceFilterProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2">
      <Select disabled={isLoadingMaintenanceList} onValueChange={handleStatusChange}>
        <SelectTrigger className="capitalize">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(MAINTENANCE_STATUS).map(([key, value]) => (
            <SelectItem className="capitalize" key={key} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        disabled={isLoadingMaintenanceList}
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

export default TenantMaintenanceFilter
