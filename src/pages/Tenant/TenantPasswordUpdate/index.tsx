import { ArrowLeft } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import type { NavigateFunction } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'

import { PageHeader, PageSection } from '@/components/layout'
import { TenantPasswordUpdateForm } from '@/components/pages/Tenant'
import { ROUTES } from '@/constants'
import { useRentoraApiTenantPasswordUpdate } from '@/hooks'
import type { TENANT_FORM_FIELDS_PASSWORD_UPDATE_TYPE_SCHEMA } from '@/types'
import { getErrorMessage } from '@/utilities'

const TenantUpdatePassword = () => {
  const navigate: NavigateFunction = useNavigate()
  const { id, apartmentId } = useParams<{ id: string; apartmentId: string }>()
  const { mutateAsync: updateTenantPassword, isPending } = useRentoraApiTenantPasswordUpdate({ userId: id })
  const [errorMessage, setErrorMessage]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const onSubmit = useCallback(
    async (data: TENANT_FORM_FIELDS_PASSWORD_UPDATE_TYPE_SCHEMA) => {
      try {
        if (!apartmentId) return
        await updateTenantPassword({ newPassword: data.password })
        toast.success('Tenant password updated successfully')
        setTimeout(() => navigate(ROUTES.tenant.getPath(apartmentId)), 1000)
      } catch (error) {
        toast.error(getErrorMessage(error))
        setErrorMessage(getErrorMessage(error))
      }
    },
    [apartmentId, navigate, updateTenantPassword],
  )

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
      <TenantPasswordUpdateForm isPending={isPending} errorMessage={errorMessage} onSubmit={onSubmit} />
    </PageSection>
  )
}

export default TenantUpdatePassword
