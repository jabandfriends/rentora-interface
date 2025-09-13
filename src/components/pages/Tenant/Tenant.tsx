//icon
import { Plus } from 'lucide-react'

//components
import { Button } from '@/components/common'
import { PageTableHeader, PageTableSearch } from '@/components/ui'
import { TENANT_DATA, TENANT_STATS } from '@/constants'

import TenantTable from './TenantTable'

export const RoomReport = () => {
  return (
    <>
      <PageTableHeader
        title="Tenants Management"
        description="Manage and view all tenants"
        stats={TENANT_STATS}
        actionButton={
          <Button className="flex items-center gap-2">
            <Plus size={18} /> New Tenant
          </Button>
        }
      />
      <PageTableSearch />
      <TenantTable data={TENANT_DATA} />
    </>
  )
}

export default RoomReport
