import { ArrowLeft, Plus } from 'lucide-react'
import { useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { PageHeader, PageSection } from '@/components/layout'
import { MaintenanceForm } from '@/components/pages/Maintenance'
import { ROUTES } from '@/constants'
import { useRentoraApiCreateMaintenance } from '@/hooks'
import type { ICreateMaintenanceRequestPayload, ISuppliesUsage, MAINTENANCE_FORM_SCHEMA_TYPE } from '@/types'
import { getErrorMessage } from '@/utilities'

const MaintenanceCreate = () => {
  const navigate = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { mutateAsync: createMaintenance, isPending } = useRentoraApiCreateMaintenance()

  const onSubmit = useCallback(
    async (data: MAINTENANCE_FORM_SCHEMA_TYPE) => {
      const payload: ICreateMaintenanceRequestPayload = {
        unitId: data.unitId,
        title: data.title,
        description: data.description ?? '',
        status: data.status,
        priority: data.priority,
        appointmentDate: data.appointmentDate,
        dueDate: data.dueDate!,
        estimatedHours: Number(data.estimatedHours),
        category: data.category,
        estimatedCost: data.estimatedCost ? Number(data.estimatedCost) : 0,
        isEmergency: data.isEmergency,
        isRecurring: data.isRecurring,
        ...(data.isRecurring && data.recurringSchedule.trim() !== '' && { recurringSchedule: data.recurringSchedule }),
        suppliesUsage: data.suppliesUsage?.map((supply: ISuppliesUsage) => ({
          supplyId: supply.supplyId,
          supplyUsedQuantity: supply.supplyUsedQuantity,
        })),
      }
      try {
        await createMaintenance({ apartmentId: apartmentId ?? '', payload })
        toast.success('Create maintenance successfully')

        setTimeout(() => {
          navigate(ROUTES.maintenance.getPath(apartmentId ?? ''))
        }, 500)
      } catch (e) {
        toast.error(getErrorMessage(e))
      }
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
      <MaintenanceForm onSubmit={onSubmit} buttonIcon={<Plus />} buttonLabel="Create a Task" isSubmitting={isPending} />
    </PageSection>
  )
}

export default MaintenanceCreate
