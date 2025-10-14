import type { MAINTENANCE_CATEGORY, MAINTENANCE_PRIORITY, MAINTENANCE_STATUS } from '@/enum'
import type { IBaseUseMutation, IRentoraApiClientBaseResponse } from '@/types'

//base payload type
export type IMaintenanceExecuteBasePayload = {
  unitId: string
  title: string
  description?: string
  appointmentDate?: string
  dueDate?: string
  startAt?: string
  completedAt?: string
  estimatedHours?: number
  actualHours?: number
  estimatedCost?: number
  actualCost?: number
  workSummary?: string
  isEmergency?: boolean
  isRecurring?: boolean
  category: MAINTENANCE_CATEGORY
  status: MAINTENANCE_STATUS
  priority: MAINTENANCE_PRIORITY
}
//create payload type
export type ICreateMaintenanceRequestPayload = {
  unitId: string
  title: string
  description: string
  status: MAINTENANCE_STATUS
  priority: MAINTENANCE_PRIORITY
  appointmentDate: string
  dueDate: string
  estimatedHours: number
  estimatedCost: number
  category: MAINTENANCE_CATEGORY
  isEmergency: boolean
}
//update payload type
export type IUpdateMaintenanceRequestPayload = Partial<
  Omit<
    IMaintenanceExecuteBasePayload,
    'startAt' | 'completedAt' | 'actualCost' | 'actualHours' | 'workSummary' | 'isRecurring'
  >
>

//hooks type UseRentoraApiCreateMaintenance
export type IUseRentoraApiCreateMaintenance = IBaseUseMutation<
  IRentoraApiClientCreateMaintenanceResponse['data'],
  { apartmentId: string; payload: ICreateMaintenanceRequestPayload }
>
//hooks type UseRentoraApiUpdateMaintenance
export type IUseRentoraApiUpdateMaintenance = IBaseUseMutation<
  IRentoraApiClientUpdateMaintenanceResponse['data'],
  { apartmentId: string; maintenanceId: string; payload: IUpdateMaintenanceRequestPayload }
>
//hooks type UseRentoraApiDeleteMaintenance
export type IUseRentoraApiDeleteMaintenance = IBaseUseMutation<
  IRentoraApiClientDeleteMaintenanceResponse['data'],
  { apartmentId: string; maintenanceId: string }
>

//create response type
export type IRentoraApiClientCreateMaintenanceResponse = IRentoraApiClientBaseResponse<{
  maintenanceId: string
}>
//update response type
export type IRentoraApiClientUpdateMaintenanceResponse = IRentoraApiClientBaseResponse<{
  maintenanceId: string
}>
//delete response type
export type IRentoraApiClientDeleteMaintenanceResponse = IRentoraApiClientBaseResponse<null>
