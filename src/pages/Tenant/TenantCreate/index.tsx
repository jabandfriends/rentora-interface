import { format } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import type { NavigateFunction } from 'react-router-dom'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { PageHeader, PageSection } from '@/components/layout'
import { CreateTenantForm } from '@/components/pages/Tenant'
import { ROUTES } from '@/constants'
import { TENANT_ROLE } from '@/enum'
import { useRentoraApiTenantCreate } from '@/hooks'
import type { CREATE_TENANT_FORM_SCHEMA_TYPE, ICreateTenantRequestPayload, IReadingContact } from '@/types'
import { getErrorMessage } from '@/utilities'

const TenantCreatePage = () => {
  const navigate: NavigateFunction = useNavigate()
  const location = useLocation()
  const navigateBefore = useCallback(() => navigate(-1), [navigate])
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [errorMessage, setErrorMessage]: [string, Dispatch<SetStateAction<string>>] = useState('')

  // Extract OCR data from location state if available
  const ocrData = (location.state as { readingContact?: IReadingContact })?.readingContact

  // Map IReadingContact to CREATE_TENANT_FORM_SCHEMA_TYPE format
  const mappedInitialValues: Partial<CREATE_TENANT_FORM_SCHEMA_TYPE> | undefined = useMemo(() => {
    if (!ocrData) return undefined

    return {
      firstName: ocrData.firstName || '',
      lastName: ocrData.lastName || '',
      email: ocrData.email || '',
      phoneNumber: ocrData.phoneNumber || '',
      nationalId: ocrData.nationId || '',
      dateOfBirth: ocrData.dateOfBirth || '',
      emergencyContactName: ocrData.emergencyContactName || '',
      emergencyContactPhone: ocrData.emergencyContactPhone || '',
      // password and confirmPassword are not provided by OCR, user needs to fill them
      password: '',
      confirmPassword: '',
      role: TENANT_ROLE.TENANT,
    }
  }, [ocrData])

  const { mutateAsync: createTenant, isPending } = useRentoraApiTenantCreate({ apartmentId })
  const onSubmit = useCallback(
    async (data: CREATE_TENANT_FORM_SCHEMA_TYPE) => {
      const { dateOfBirth, nationalId, emergencyContactName, emergencyContactPhone, ...rest } = data
      const payload: ICreateTenantRequestPayload = {
        ...rest,
        birthDate: dateOfBirth ? format(dateOfBirth, 'yyyy-MM-dd') : '',
        nationalId: nationalId ?? '',
        emergencyContactName: emergencyContactName ?? '',
        emergencyContactPhone: emergencyContactPhone ?? '',
      }

      try {
        await createTenant(payload)
        toast.success('Tenant created successfully')

        setTimeout(() => navigate(ROUTES.tenant.getPath(apartmentId)), 1000)
      } catch (error) {
        toast.error(getErrorMessage(error))
        setErrorMessage(getErrorMessage(error))
      }
    },
    [apartmentId, navigate, createTenant],
  )

  return (
    <PageSection>
      <PageHeader
        title="Create Tenant"
        description="Fill out the form below to create a new tenant."
        isAction
        actionLabel="Back"
        actionIcon={<ArrowLeft />}
        actionOnClick={navigateBefore}
      />
      <CreateTenantForm
        onSubmit={onSubmit}
        isPending={isPending}
        errorMessage={errorMessage}
        initialValues={mappedInitialValues}
      />
    </PageSection>
  )
}

export default TenantCreatePage
