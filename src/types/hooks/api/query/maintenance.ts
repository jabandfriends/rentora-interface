import type { Category, Priority, RecurringSchedule, Status } from '@/enum'
import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '@/types'

//Maintenance type
export type IMaintenance = {
  id: string
  ticketNumber: string
  unitId: string
  tenantUserId: string
  assignedToUserId: string
  title: string
  description: string
  category: Category
  status: Status
  priority: Priority
  requestedDate: string
  appointmentDate: string
  startedAt: string
  completedAt: string
  dueDate: string
  estimatedHours: number
  actualHours: number
  estimatedCost: number
  actualCost: number
  workSummary: string
  tenantFeedback: string
  tenantRating: number
  isEmergency: boolean
  isRecurring: boolean
  recurringSchedule: RecurringSchedule
  createdAt: string
  updatedAt: string
}

//Maintenance detail type
export type IMaintenanceDetail = IMaintenance

//detail response type
export type IRentoraApiClientMaintenanceDetailResponse = IRentoraApiClientBaseResponse<IMaintenanceDetail>

//hooks type useRentoraApiMaintenanceDetail
export type IUseRentoraApiMaintenanceDetail = IBaseUseQuery<IRentoraApiClientMaintenanceDetailResponse['data']>

//Maintenance detail params
export type IRentoraApiMaintenanceDetailParams = {
  apartmentId: string
  maintenanceId: string
}
