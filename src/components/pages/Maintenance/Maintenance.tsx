import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/common'
import { MaintenanceTable } from '@/components/pages/Maintenance'
import { PageTableHeader } from '@/components/ui'
import { MAINTENANCE_STATS, MAINTENANCE_TABLE_DATA, ROUTES } from '@/constants'

const Maintenance = () => {
  const navigate = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const handleCreate = useCallback(
    () => navigate(ROUTES.maintenanceCreate.getPath(apartmentId)),
    [navigate, apartmentId],
  )
  return (
    <>
      <PageTableHeader
        title="Maintenance"
        description="Manage maintenance reports"
        stats={MAINTENANCE_STATS}
        actionButton={<Button onClick={handleCreate}>New Report</Button>}
      />
      {/* <PageTableSearch /> */}
      <MaintenanceTable data={MAINTENANCE_TABLE_DATA} />
    </>
  )
}

export default Maintenance
