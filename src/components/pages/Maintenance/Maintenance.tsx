import { Button } from '@/components/common'
import { PageTableHeader, PageTableSearch } from '@/components/ui'
import { MAINTENANCE_STATS, MAINTENANCE_TABLE_DATA } from '@/constants'

import MaintenanceTable from './MaintenanceTable'

const Maintenance = () => {
  return (
    <>
      <PageTableHeader
        title="Maintenance"
        description="Manage maintenance reports"
        stats={MAINTENANCE_STATS}
        actionButton={<Button>New Report</Button>}
      />
      <PageTableSearch />
      <MaintenanceTable data={MAINTENANCE_TABLE_DATA} />
    </>
  )
}

export default Maintenance
