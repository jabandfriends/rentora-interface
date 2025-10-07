import { ArrowLeft, PenLine } from 'lucide-react'
import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { PageHeader, PageSection } from '@/components/layout'
import { MaintenanceForm } from '@/components/pages/Maintenance'
import { ROUTES } from '@/constants'
import type { MAINTENANCE_FORM_SCHEMA_TYPE } from '@/types'

const MaintenanceUpdate = () => {
  const navigate = useNavigate()
  const onSubmit = useCallback((data: MAINTENANCE_FORM_SCHEMA_TYPE) => {
    alert(data)
    // wait for api
  }, [])
  const { apartmentId } = useParams<{ apartmentId: string }>()

  //navigate before page
  const navigateBefore = useCallback(() => navigate(ROUTES.maintenance.getPath(apartmentId)), [navigate, apartmentId])
  return (
    <PageSection className="space-y-4">
      <PageHeader
        title="Update Maintenance"
        description="Update maintenance task"
        isAction
        actionLabel="Back"
        actionIcon={<ArrowLeft />}
        actionOnClick={navigateBefore}
      />
      <MaintenanceForm onSubmit={onSubmit} buttonIcon={<PenLine />} buttonLabel="Update a Task" />
    </PageSection>
  )
}

export default MaintenanceUpdate
