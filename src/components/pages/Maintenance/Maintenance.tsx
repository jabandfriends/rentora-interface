import { Button } from '@/components/common'
import { MaintenanceTable } from '@/components/pages/Maintenance'
import { PageTableHeader, PageTableSearch } from '@/components/ui'
import { MAINTENANCE_STATS, MAINTENANCE_TABLE_DATA } from '@/constants'

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
