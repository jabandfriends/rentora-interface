import { ArrowLeft } from 'lucide-react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { PageHeader, PageSection } from '@/components/layout'
import { TenantForm } from '@/components/pages/Tenant'
import { ROUTES } from '@/constants'
import type { TENANT_FORM_SCHEMA_TYPE } from '@/types'

const TenantCreate = () => {
  const navigate = useNavigate()
  const onSubmit = useCallback((data: TENANT_FORM_SCHEMA_TYPE) => {
    alert(data)
  }, [])

  //navigate before page
  const navigateBefore = useCallback(() => navigate(ROUTES.home.path), [navigate])
  return (
    <PageSection className="space-y-4">
      <PageHeader
        title="Create Tenant"
        description="Fill out the form below to create a new tenant."
        isAction
        actionLabel="Back"
        actionIcon={<ArrowLeft />}
        actionOnClick={navigateBefore}
      />
      <TenantForm onSubmit={onSubmit} />
    </PageSection>
  )
}

export default TenantCreate
