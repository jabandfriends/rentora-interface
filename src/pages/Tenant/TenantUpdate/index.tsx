import { PenLine } from 'lucide-react'

import { PageHeader, PageSection } from '@/components/layout'
import { TenantForm } from '@/components/pages/Tenant/'

const TenantUpdatePage = () => {
  return (
    <PageSection>
      <PageHeader title="Update Tenant" description="Fill out the form below to update a tenant." />
      <TenantForm onSubmit={() => {}} iconLabel={<PenLine />} buttonLabel="Update Tenant" />
    </PageSection>
  )
}

export default TenantUpdatePage
