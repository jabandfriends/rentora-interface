import { ArrowLeft, PenLine } from 'lucide-react'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { Spinner } from '@/components/common'
import { PageHeader, PageSection } from '@/components/layout'
import { MaintenanceForm } from '@/components/pages/Maintenance'
import { ROUTES } from '@/constants'
import { useRentoraApiMaintenanceDetail, useRentoraApiUpdateMaintenance } from '@/hooks'
import type { IUpdateMaintenanceRequestPayload, MAINTENANCE_FORM_SCHEMA_TYPE } from '@/types'
import { getErrorMessage } from '@/utilities'

const MaintenanceUpdate = () => {
  const { apartmentId, id } = useParams<{ apartmentId: string; id: string }>()
  const navigate = useNavigate()
  const { data, isLoading, isPending } = useRentoraApiMaintenanceDetail({
    maintenanceId: id ?? '',
    apartmentId: apartmentId ?? '',
  })
  const { mutateAsync: updateMaintenance } = useRentoraApiUpdateMaintenance()

  const onSubmit = useCallback(
    async (data: MAINTENANCE_FORM_SCHEMA_TYPE) => {
      const payload: IUpdateMaintenanceRequestPayload = {
        unitId: data.unitId,
        title: data.title,
        description: data.description ?? '',
        status: data.status,
        priority: data.priority,
        appointmentDate: data.appointmentDate,
        dueDate: data.dueDate!,
        estimatedHours: data.estimatedHours ? Number(data.estimatedHours) : undefined,
        category: data.category,
        estimatedCost: data.estimatedCost ? Number(data.estimatedCost) : undefined,
        isEmergency: data.isEmergency,
        isRecurring: data.isRecurring,
        ...(data.isRecurring && data.recurringSchedule.trim() !== '' && { recurringSchedule: data.recurringSchedule }),
      }
      try {
        await updateMaintenance({ apartmentId: apartmentId ?? '', maintenanceId: id ?? '', payload })
        toast.success('Update maintenance successfully')

        setTimeout(() => {
          navigate(ROUTES.maintenance.getPath(apartmentId ?? ''))
        }, 500)
      } catch (e) {
        toast.error(getErrorMessage(e))
      }
    },
    [apartmentId, updateMaintenance, id, navigate],
  )

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
      <MaintenanceForm
        defaultValues={data}
        onSubmit={onSubmit}
        buttonIcon={<PenLine />}
        buttonLabel="Update a Task"
        isSubmitting={isPending}
        key={id}
      />
    </PageSection>
  )
}

export default MaintenanceUpdate
