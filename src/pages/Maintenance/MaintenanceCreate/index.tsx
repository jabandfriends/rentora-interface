import { ArrowLeft } from 'lucide-react'
import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { PageHeader, PageSection } from '@/components/layout'
import { UpdateMaintenanceForm } from '@/components/pages/Maintenance'
// import { MaintenanceForm } from '@/components/pages/Maintenance'
import { ROUTES } from '@/constants'
import type { UPDATE_MAINTENANCE_FORM_SCHEMA_TYPE } from '@/types'

const MaintenanceCreate = () => {
  const navigate = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const onSubmit = useCallback((data: UPDATE_MAINTENANCE_FORM_SCHEMA_TYPE) => {
    alert(data)
  }, [])

  //navigate before page
  const navigateBefore = useCallback(() => navigate(ROUTES.maintenance.getPath(apartmentId)), [navigate, apartmentId])
  return (
    <PageSection className="space-y-4">
      <PageHeader
        title="Create Maintenance"
        description="Create a new maintenance task"
        isAction
        actionLabel="Back"
        actionIcon={<ArrowLeft />}
        actionOnClick={navigateBefore}
      />
      <UpdateMaintenanceForm
        onSubmit={onSubmit}
        buttonLabel="Create a Task"
        iconLabel={<ArrowLeft />}
        isPending={false}
        errorMessage={undefined}
      />
      {/* <MaintenanceForm onSubmit={onSubmit} buttonIcon={<Plus />} buttonLabel="Create a Task" /> */}
    </PageSection>
  )
}

export default MaintenanceCreate
