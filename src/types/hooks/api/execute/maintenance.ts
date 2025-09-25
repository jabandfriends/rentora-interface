import type { Category, Priority, RecurringSchedule, Status } from '@/enum'

import type { IBaseUseMutation, IRentoraApiClientBaseResponse } from '../base-api'

//payload type
type ICreateMaintenanceRequestBase = {
  unitId: string
  tenantUserId: string
  ticketName: string
  title: string
  description?: string
  appointmentDate?: string
  startAt?: string
  completedAt?: string
  estimatedHours?: number
  actualHours?: number
  estimatedCost?: number
  actualCost?: number
  workSummary?: string
  isEmergency?: boolean
  isRecurring?: boolean
  category: Category
  status: Status
  priority: Priority
  recurringSchedule: RecurringSchedule
}

export type ICreateMaintenanceRequestPayload = ICreateMaintenanceRequestBase

//hook type
export type IUseRentoraApiCreateMaintenance = IBaseUseMutation<
  IRentoraApiClientCreateMaintenanceResponse['data'],
  { apartmentId: string; payload: ICreateMaintenanceRequestPayload }
>

//response type
export type IRentoraApiClientCreateMaintenanceResponse = IRentoraApiClientBaseResponse<{
  maintenanceId: string
}>
