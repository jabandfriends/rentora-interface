import { PageHeader, PageSection } from '@/components/layout'
import { Tenant } from '@/components/pages/Tenant'

function TenantPage() {
  return (
    <PageSection>
      <PageHeader title="Users Management" description="Easily manage and track all your tenants here!" />
      <Tenant />
    </PageSection>
  )
}

export default TenantPage
