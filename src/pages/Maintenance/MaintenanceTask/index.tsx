import { PageHeader, PageSection } from '@/components/layout'
import { Maintenance } from '@/components/pages/Maintenance'

const MaintenancePage = () => {
  return (
    <PageSection>
      <PageHeader title="Maintenance Tasks Management" description="Manage maintenance tasks for this apartment" />
      <Maintenance />
    </PageSection>
  )
}

export default MaintenancePage
