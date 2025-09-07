import { ArrowLeft } from 'lucide-react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { PageHeader, PageSection } from '@/components/layout'
import { MaintenanceForm } from '@/components/pages/Maintenance'
import { ROUTES } from '@/constants'
import type { MAINTENANCE_FORM_SCHEMA_TYPE } from '@/types'

const MaintenanceCreate = () => {
  const navigate = useNavigate()
  const onSubmit = useCallback((data: MAINTENANCE_FORM_SCHEMA_TYPE) => {
    alert(data)
  }, [])

  //navigate before page
  const navigateBefore = useCallback(() => navigate(ROUTES.maintenance.path), [navigate])
  return (
    <PageSection>
      <PageHeader
        title="Create Maintenance"
        description="Create a new maintenance task"
        isAction
        actionLabel="Back"
        actionIcon={<ArrowLeft />}
        actionOnClick={navigateBefore}
      />
      <MaintenanceForm onSubmit={onSubmit} />
    </PageSection>
  )
}

export default MaintenanceCreate
