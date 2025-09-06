import { useCallback } from 'react'

import { PageHeader, PageSection } from '@/components/layout'
import { MaintenanceForm } from '@/components/pages/Maintenance'
import type { MAINTENANCE_FORM_SCHEMA_TYPE } from '@/types'

const MaintenanceCreate = () => {
  const onSubmit = useCallback((data: MAINTENANCE_FORM_SCHEMA_TYPE) => {
    console.log(data)
  }, [])
  return (
    <PageSection>
      <PageHeader title="Create Maintenance" description="Create a new maintenance task" />
      <MaintenanceForm onSubmit={onSubmit} />
    </PageSection>
  )
}

export default MaintenanceCreate
