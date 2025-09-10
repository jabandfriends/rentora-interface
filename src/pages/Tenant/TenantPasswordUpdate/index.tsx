import { ArrowLeft } from 'lucide-react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { PageHeader, PageSection } from '@/components/layout'
import { TenantPasswordUpdateForm } from '@/components/pages/Tenant'
import type { TENANT_FORM_FIELDS_PASSWORD_UPDATE_TYPE_SCHEMA } from '@/types'

const TenantUpdatePassword = () => {
  const navigate = useNavigate()
  const onSubmit = useCallback((data: TENANT_FORM_FIELDS_PASSWORD_UPDATE_TYPE_SCHEMA) => {
    alert(data)
  }, [])

  //navigate before
  const navigateBefore = useCallback(() => navigate(-1), [navigate])
  return (
    <PageSection>
      <PageHeader
        title="Update Password"
        description="Update your Tenant's Password"
        isAction
        actionLabel="Back"
        actionIcon={<ArrowLeft />}
        actionOnClick={navigateBefore}
      />
      <TenantPasswordUpdateForm onSubmit={onSubmit} />
    </PageSection>
  )
}

export default TenantUpdatePassword
