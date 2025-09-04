import { PageHeader, PageSection } from '@/components/layout'
import { MaintenanceForm } from '@/components/pages/Maintenance'

const MaintenanceCreate = () => {
  return (
    <PageSection>
      <PageHeader title="Create Maintenance" description="Create a new maintenance task" />
      <MaintenanceForm />
    </PageSection>
  )
}

export default MaintenanceCreate
