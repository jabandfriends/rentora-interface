import { ArrowLeft, PenLine } from 'lucide-react'
import { useCallback, useMemo } from 'react'
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
  const defaultValues: MAINTENANCE_FORM_SCHEMA_TYPE = useMemo(() => {
    return {
      unitId: (data as any)?.unitId ?? (data as any)?.unit?.id ?? null,
      title: (data as any)?.title ?? '',
      description: (data as any)?.description ?? '',
      status: (data as any)?.status,
      priority: (data as any)?.priority,
      appointmentDate: (data as any)?.appointmentDate,
      dueDate: (data as any)?.dueDate,
      estimatedHours: (data as any)?.estimatedHours ?? '',
      category: (data as any)?.category,
      estimatedCost: (data as any)?.estimatedCost ?? '',
      isEmergency: Boolean((data as any)?.isEmergency),
    } as unknown as MAINTENANCE_FORM_SCHEMA_TYPE
  }, [data])
  const onSubmit = useCallback(
    async (data: MAINTENANCE_FORM_SCHEMA_TYPE) => {
      if (!apartmentId || !id) {
        throw new Error('Missing route params: apartmentId or maintenanceId')
      }
      const payload: IUpdateMaintenanceRequestPayload = {
        unitId: data.unitId,
        title: data.title,
        description: data.description ?? '',
        status: data.status,
        priority: data.priority,
        appointmentDate: data.appointmentDate,
        dueDate: data.dueDate!,
        estimatedHours: Number(data.estimatedHours),
        category: data.category,
        estimatedCost: Number(data.estimatedCost),
        isEmergency: data.isEmergency,
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
        defaultValues={defaultValues}
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
