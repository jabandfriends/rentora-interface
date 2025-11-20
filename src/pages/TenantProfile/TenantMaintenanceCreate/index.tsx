import { ArrowLeft, Plus } from 'lucide-react'
import { useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

import { PageHeader, PageSection } from '@/components/layout'
import { TenantMaintenanceForm } from '@/components/pages/TenantProfile/TenantMaintenance'
import { ROUTES } from '@/constants'
import { useRentoraApiCreateTenantMaintenance } from '@/hooks'
import type { ICreateTenantMaintenanceRequestPayload, TENANT_MAINTENANCE_FORM_SCHEMA_TYPE } from '@/types'
import { getErrorMessage } from '@/utilities'

const TenantMaintenanceCreate = () => {
  const navigate = useNavigate()
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { mutateAsync: createTenantMaintenance, isPending } = useRentoraApiCreateTenantMaintenance()

  const onSubmit = useCallback(
    async (data: TENANT_MAINTENANCE_FORM_SCHEMA_TYPE) => {
      const payload: ICreateTenantMaintenanceRequestPayload = {
        title: data.title,
        description: data.description ?? '',
        priority: data.priority,
        appointmentDate: data.appointmentDate,
        dueDate: data.dueDate!,
        estimatedHours: Number(data.estimatedHours) || 0,
        category: data.category,
        estimatedCost: data.estimatedCost ? Number(data.estimatedCost) : 0,
        isEmergency: data.isEmergency,
        isRecurring: data.isRecurring,
        ...(data.isRecurring && data.recurringSchedule.trim() !== '' && { recurringSchedule: data.recurringSchedule }),
      }
      try {
        await createTenantMaintenance({ apartmentId: apartmentId ?? '', payload })
        toast.success('Maintenance request created successfully')

        setTimeout(() => {
          navigate(ROUTES.tenantMaintenance.getPath(apartmentId ?? ''))
        }, 500)
      } catch (e) {
        toast.error(getErrorMessage(e))
      }
    },
    [apartmentId, createTenantMaintenance, navigate],
  )

  //navigate before page
  const navigateBefore = useCallback(() => navigate(ROUTES.tenantMaintenance.getPath(apartmentId ?? '')), [navigate, apartmentId])
  
  return (
    <PageSection className="space-y-4">
      <PageHeader
        title="Create Maintenance Request"
        description="Submit a new maintenance request for your unit"
        isAction
        actionLabel="Back"
        actionIcon={<ArrowLeft />}
        actionOnClick={navigateBefore}
      />
      <TenantMaintenanceForm onSubmit={onSubmit} buttonIcon={<Plus />} buttonLabel="Create Request" isSubmitting={isPending} />
    </PageSection>
  )
}

export default TenantMaintenanceCreate

