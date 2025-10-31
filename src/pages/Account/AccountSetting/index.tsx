import { format } from 'date-fns'
import { ArrowLeft, PenLine } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { type NavigateFunction, useNavigate } from 'react-router-dom'

import { Spinner } from '@/components/common'
import { PageHeader, PageSection } from '@/components/layout'
import { AccountForm } from '@/components/pages/Account'
import { ROUTES } from '@/constants'
import { useRentoraApiUpdateUser, useRentoraApiUser } from '@/hooks'
import type { IUpdateUserRequestPayload, USER_FORM_SCHEMA_TYPE } from '@/types'
import { getErrorMessage } from '@/utilities'

const AccountSettingsPage = () => {
  const navigate: NavigateFunction = useNavigate()
  const { data, isLoading, isPending } = useRentoraApiUser()
  const { mutateAsync: updateUser } = useRentoraApiUpdateUser()
  const [errorMessage, setErrorMessage]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const onSubmit = useCallback(
    async (data: USER_FORM_SCHEMA_TYPE) => {
      const payload: IUpdateUserRequestPayload = {
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
        await updateUser(payload)
        toast.success('User updated successfully')
        setTimeout(() => navigate(ROUTES.allApartment.path), 1000)
      } catch (error) {
        toast.error(getErrorMessage(error))
        setErrorMessage(getErrorMessage(error))
      }
    },
    [updateUser, navigate],
  )

  const navigateBefore = useCallback(() => navigate(-1), [navigate])

  if (!data || isLoading)
    return (
      <div className="bg-page flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )

  return (
    <PageSection>
      <PageHeader
        title="Account"
        description="Update your account."
        isAction
        actionLabel="Back"
        actionIcon={<ArrowLeft />}
        actionOnClick={navigateBefore}
      />
      <AccountForm
        defaultValues={data}
        onSubmit={onSubmit}
        iconLabel={<PenLine />}
        buttonLabel="Update Account"
        isPending={isPending}
        errorMessage={errorMessage}
      />
    </PageSection>
  )
}

export default AccountSettingsPage
