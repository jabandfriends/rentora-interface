import { format } from 'date-fns'
import { PenLine } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { PageHeader, PageSection } from '@/components/layout'
import { UpdateTenantForm } from '@/components/pages/Tenant/'
import { LoadingPage } from '@/components/ui'
import { ROUTES } from '@/constants'
import { useRentoraApiTenantDetail, useRentoraApiTenantUpdate } from '@/hooks'
import type { IUpdateTenantRequestPayload, UPDATE_TENANT_FORM_SCHEMA_TYPE } from '@/types'
import { getErrorMessage } from '@/utilities'

const TenantUpdatePage = () => {
  const { id: apartmentUserId, apartmentId } = useParams<{ id: string; apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()
  const { data: tenantDetail, isLoading, isPending } = useRentoraApiTenantDetail({ userId: apartmentUserId })
  const { mutateAsync: updateTenant } = useRentoraApiTenantUpdate({ userId: tenantDetail?.userId })
  const [errorMessage, setErrorMessage]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const onSubmit = useCallback(
    async (data: UPDATE_TENANT_FORM_SCHEMA_TYPE) => {
      const payload: IUpdateTenantRequestPayload = {
        apartmentUserId: tenantDetail?.apartmentUserId ?? '',
        birthDate: data.dateOfBirth ? format(data.dateOfBirth, 'yyyy-MM-dd') : undefined,
        emergencyContactPhone: data.emergencyContactPhone ? data.emergencyContactPhone : undefined,
        emergencyContactName: data.emergencyContactName ? data.emergencyContactName : undefined,
        phoneNumber: data.phoneNumber ? data.phoneNumber : undefined,
        nationalId: data.nationalId ? data.nationalId : undefined,
        email: data.email ? data.email : undefined,
        lastName: data.lastName ? data.lastName : undefined,
        firstName: data.firstName ? data.firstName : undefined,
        role: data.role ? data.role : undefined,
        isActive: data.isActive ? (data.isActive === 'active' ? true : false) : undefined,
      }
      try {
        await updateTenant(payload)
        toast.success('Tenant updated successfully')
        setTimeout(() => navigate(ROUTES.tenant.getPath(apartmentId)), 1000)
      } catch (error) {
        toast.error(getErrorMessage(error))
        setErrorMessage(getErrorMessage(error))
      }
    },
    [updateTenant, apartmentId, navigate, tenantDetail?.apartmentUserId],
  )

  if (!tenantDetail || isLoading) return <LoadingPage />

  return (
    <PageSection>
      <PageHeader title="Update Tenant" description="Fill out the form below to update a tenant." />
      <UpdateTenantForm
        defaultValues={tenantDetail}
        onSubmit={onSubmit}
        iconLabel={<PenLine />}
        buttonLabel="Update Tenant"
        isPending={isPending}
        errorMessage={errorMessage}
      />
    </PageSection>
  )
}

export default TenantUpdatePage
