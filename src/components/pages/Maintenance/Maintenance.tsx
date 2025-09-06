import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/common'
import { MaintenanceTable } from '@/components/pages/Maintenance'
import { PageTableHeader, PageTableSearch } from '@/components/ui'
import { MAINTENANCE_STATS, MAINTENANCE_TABLE_DATA, ROUTES } from '@/constants'

const Maintenance = () => {
  const navigate = useNavigate()
  return (
    <>
      <PageTableHeader
        title="Maintenance"
        description="Manage maintenance reports"
        stats={MAINTENANCE_STATS}
        actionButton={<Button onClick={() => navigate(ROUTES.maintenanceCreate.path)}>New Report</Button>}
      />
      <PageTableSearch />
      <MaintenanceTable data={MAINTENANCE_TABLE_DATA} />
    </>
  )
}

export default Maintenance
