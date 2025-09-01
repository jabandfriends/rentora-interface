import { Button } from '@/components/common'
import { PageTableHeader } from '@/components/ui'
import { MAINTENANCE_REPORTS, MAINTENANCE_STATS } from '@/constants'

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
      <MaintenanceTable data={MAINTENANCE_REPORTS} />
    </>
  )
}

export default Maintenance
