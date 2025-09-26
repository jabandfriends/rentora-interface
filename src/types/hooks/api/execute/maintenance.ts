import type { Category, Priority, RecurringSchedule, Status } from '@/enum'

import type { IBaseUseMutation, IRentoraApiClientBaseResponse } from '../base-api'

//create payload type
export type ICreateMaintenanceRequestPayload = {
  unitId: string
  tenantUserId: string
  ticketNumber: string
  title: string
  description?: string
  appointmentDate?: string
  startAt?: string
  completedAt?: string
  dueDate?: string
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

//create hook type
export type IUseRentoraApiCreateMaintenance = IBaseUseMutation<
  IRentoraApiClientCreateMaintenanceResponse['data'],
  { apartmentId: string; payload: ICreateMaintenanceRequestPayload }
>

//create response type
export type IRentoraApiClientCreateMaintenanceResponse = IRentoraApiClientBaseResponse<{
  maintenanceId: string
}>

//update payload type
export type IUpdateMaintenanceRequestPayload = {
  title: string
  description?: string
  category: Category
  status: Status
  priority: Priority
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
  recurringSchedule: RecurringSchedule
}

//update hook type
export type IUseRentoraApiUpdateMaintenance = IBaseUseMutation<
  IRentoraApiClientUpdateMaintenanceResponse['data'],
  { apartmentId: string; maintenanceId: string; payload: IUpdateMaintenanceRequestPayload }
>

//update response type
export type IRentoraApiClientUpdateMaintenanceResponse = IRentoraApiClientBaseResponse<{
  maintenanceId: string
}>

//delete hook type
export type IUseRentoraApiDeleteMaintenance = IBaseUseMutation<
  IRentoraApiClientDeleteMaintenanceResponse['data'],
  { apartmentId: string; maintenanceId: string }
>

//delete response type
export type IRentoraApiClientDeleteMaintenanceResponse = IRentoraApiClientBaseResponse<null>
