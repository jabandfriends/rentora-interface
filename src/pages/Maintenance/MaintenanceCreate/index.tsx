import { ArrowLeft, Plus } from 'lucide-react'
import { useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { PageHeader, PageSection } from '@/components/layout'
import { MaintenanceForm } from '@/components/pages/Maintenance'
import { ROUTES } from '@/constants'
import { Priority, Status } from '@/enum'
import { useRentoraApiCreateMaintenance, useRentoraApiUnitList } from '@/hooks'
import type { ICreateMaintenanceRequestPayload, MAINTENANCE_FORM_SCHEMA_TYPE } from '@/types'

const MaintenanceCreate = () => {
  const navigate = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: unitList = [], isLoading: unitsLoading } = useRentoraApiUnitList({
    apartmentId: apartmentId ?? '',
    params: { page: 0, size: 50, search: '' },
  })
  const { mutateAsync: createMaintenance, isPending } = useRentoraApiCreateMaintenance()

  const onSubmit = useCallback(
    async (data: MAINTENANCE_FORM_SCHEMA_TYPE) => {
      const payload: ICreateMaintenanceRequestPayload = {
        unitId: data.unit_id,
        title: data.title,
        description: data.description,
        status: data.status as Status,
        priority: data.priority as Priority,
        appointmentDate: data.appointment_date,
        dueDate: data.due_date!,
        estimatedHours: Number(data.estimated_hours),
      }
      await createMaintenance({ apartmentId: apartmentId ?? '', payload })
      toast.success('Create maintenance successfully')

      setTimeout(() => {
        navigate(ROUTES.maintenance.getPath(apartmentId ?? ''))
      }, 1500)
    },
    [apartmentId, createMaintenance, navigate],
  )

  //navigate before page
  const navigateBefore = useCallback(() => navigate(ROUTES.maintenance.getPath(apartmentId)), [navigate, apartmentId])
  return (
    <PageSection className="space-y-4">
      <PageHeader
        title="Create Maintenance"
        description="Create a new maintenance task"
        isAction
        actionLabel="Back"
        actionIcon={<ArrowLeft />}
        actionOnClick={navigateBefore}
      />
      <MaintenanceForm
        onSubmit={onSubmit}
        buttonIcon={<Plus />}
        buttonLabel="Create a Task"
        isSubmitting={isPending}
        units={unitList}
        unitsLoading={unitsLoading}
      />
    </PageSection>
  )
}

export default MaintenanceCreate
