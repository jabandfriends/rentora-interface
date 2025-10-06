import { ArrowLeft, PenLine } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '@/components/common'
import { PageHeader, PageSection } from '@/components/layout'
import { UpdateMaintenanceForm } from '@/components/pages/Maintenance'
import { ROUTES } from '@/constants'
import { useRentoraApiMaintenanceDetail, useRentoraApiUpdateMaintenance } from '@/hooks'
import type { IUpdateMaintenanceRequestPayload, UPDATE_MAINTENANCE_FORM_SCHEMA_TYPE } from '@/types'
import { getErrorMessage } from '@/utilities'

const MaintenanceUpdate = () => {
  const { apartmentId, maintenanceId } = useParams<{ apartmentId: string; maintenanceId: string }>()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage]: [string, Dispatch<SetStateAction<string>>] = useState('')
  const { data, isLoading, isPending } = useRentoraApiMaintenanceDetail({
    maintenanceId: maintenanceId ?? '',
    apartmentId: apartmentId ?? '',
  })
  const { mutateAsync: updateMaintenance } = useRentoraApiUpdateMaintenance()
  const onSubmit = useCallback(
    async (data: UPDATE_MAINTENANCE_FORM_SCHEMA_TYPE) => {
      if (!apartmentId || !maintenanceId) {
        throw new Error('Missing route params: apartmentId or maintenanceId')
      }
      const payload: IUpdateMaintenanceRequestPayload = {
        title: data.title ? data.title : undefined,
        description: data.description ? data.description : undefined,
        appointmentDate: data.appointmentDate ? new Date(data.appointmentDate).toISOString() : undefined,
        dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
        priority: data.priority ? data.priority : undefined,
        status: data.status ? data.status : undefined,
        category: data.category ? data.category : undefined,
        estimatedHours: data.estimatedHours ? data.estimatedHours : undefined,
        recurringSchedule: data.recurringSchedule ? data.recurringSchedule : undefined,
      }
      try {
        await updateMaintenance({
          apartmentId: apartmentId ?? '',
          maintenanceId: maintenanceId ?? '',
          payload,
        })
        toast.success('Maintenance updated successfully')
        setTimeout(() => navigate(ROUTES.maintenance.getPath(apartmentId)), 1000)
      } catch (error) {
        toast.error(getErrorMessage(error))
        setErrorMessage(getErrorMessage(error))
      }
    },
    [updateMaintenance, apartmentId, maintenanceId, navigate],
  )

  //navigate before page
  const navigateBefore = useCallback(() => navigate(ROUTES.maintenance.getPath(apartmentId)), [navigate, apartmentId])

  if (!data || isLoading)
    return (
      <div className="bg-page flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    )
  return (
    <PageSection className="space-y-4">
      <PageHeader
        title="Update Maintenance"
        description="Update maintenance task"
        isAction
        actionLabel="Back"
        actionIcon={<ArrowLeft />}
        actionOnClick={navigateBefore}
      />
      <UpdateMaintenanceForm
        onSubmit={onSubmit}
        defaultValues={data}
        buttonLabel="Update Maintenance"
        iconLabel={<PenLine />}
        isPending={isPending}
        errorMessage={errorMessage}
      />
    </PageSection>
  )
}

export default MaintenanceUpdate
