import { format } from 'date-fns'
import { PenLine } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '@/components/common'
import { PageHeader, PageSection } from '@/components/layout'
import { UpdateTenantForm } from '@/components/pages/Tenant/'
import { ROUTES } from '@/constants'
import { useRentoraApiTenantDetail, useRentoraApiTenantUpdate } from '@/hooks'
import type { IUpdateTenantRequestPayload, UPDATE_TENANT_FORM_SCHEMA_TYPE } from '@/types'
import { getErrorMessage } from '@/utilities'

const TenantUpdatePage = () => {
  const { id, apartmentId } = useParams<{ id: string; apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()
  const { data, isLoading, isPending } = useRentoraApiTenantDetail({ userId: id })
  const { mutateAsync: updateTenant } = useRentoraApiTenantUpdate({ userId: id })
  const [errorMessage, setErrorMessage]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const onSubmit = useCallback(
    async (data: UPDATE_TENANT_FORM_SCHEMA_TYPE) => {
      const payload: IUpdateTenantRequestPayload = {
        birthDate: data.dateOfBirth ? format(data.dateOfBirth, 'yyyy-MM-dd') : undefined,
        emergencyContactPhone: data.emergencyContactPhone ? data.emergencyContactPhone : undefined,
        emergencyContactName: data.emergencyContactName ? data.emergencyContactName : undefined,
        phoneNumber: data.phoneNumber ? data.phoneNumber : undefined,
        nationalId: data.nationalId ? data.nationalId : undefined,
        email: data.email ? data.email : undefined,
        lastName: data.lastName ? data.lastName : undefined,
        firstName: data.firstName ? data.firstName : undefined,
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
    [updateTenant, apartmentId, navigate],
  )

  if (!data || isLoading)
    return (
      <div className="bg-page flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )

  return (
    <PageSection>
      <PageHeader title="Update Tenant" description="Fill out the form below to update a tenant." />
      <UpdateTenantForm
        defaultValues={data}
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
