import { Plus } from 'lucide-react'

import { Button } from '@/components/common'
import TenantsManagementTable from '@/components/pages/TenantsManagement/TenantsManagementTable'
import { PageTableHeader } from '@/components/ui'
import { TENANTS_DATA, TENANTS_STAT } from '@/constants/tenantsmanage'

const TenantsManagement = () => {
  return (
    <>
      <PageTableHeader
        title="Tenants Management"
        description="Manage and view all tenants"
        stats={TENANTS_STAT}
        actionButton={
          <Button className="flex items-center gap-2">
            <Plus size={18} /> New Invoice
          </Button>
        }
      />
      {/* <PageTableSearch /> */}
      <TenantsManagementTable data={TENANTS_DATA} />
    </>
  )
}

export default TenantsManagement
