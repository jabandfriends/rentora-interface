import { PageHeader, PageSection } from '@/components/layout'
import { TenantMaintenanceList } from '@/components/pages/TenantProfile/TenantMaintenance'

const TenantMaintenance = () => {
  return (
    <PageSection>
      <PageHeader
        title="Maintenance Requests"
        description="Here you can view and keep track of all maintenance requests assigned to you as a tenant. Stay updated and make sure you don’t miss any outstanding requests."
      />
      <TenantMaintenanceList />
    </PageSection>
  )
}

export default TenantMaintenance
