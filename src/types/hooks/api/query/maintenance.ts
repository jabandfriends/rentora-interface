<<<<<<< HEAD
import type { IBasePaginateQueryResult, IBaseUseQuery, IRentoraApiClientBaseResponse, Maybe } from '@/types'

export type IUseRentoraApiMaintenanceList = IBasePaginateQueryResult<
  IRentoraApiClientBaseResponse<IMaintenance['data']>
>

export type IMaintenance = {
  id: string
  ticketNumber: string
  title: string
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
  requestedDate: string
  unitName: string
  tenantUserName: string
  isEmergency: boolean
}

export type IMaintenanceDetail = IMaintenance & {
  description: Maybe<string>
  category: string
  priority: string
  appointmentDate: Maybe<string>
  startedAt: Maybe<string>
  completedAt: Maybe<string>
  dueDate: Maybe<string>
  estimatedHours: Maybe<number>
  actualHours: Maybe<number>
  estimatedCost: Maybe<number>
  actualCost: Maybe<number>
  workSummary: Maybe<string>
  tenantFeedback: Maybe<string>
  tenantRating: Maybe<number>
  isRecurring: boolean
=======
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
>>>>>>> feat/REN-112-Hook-Maintenance
  createdAt: string
  updatedAt: string
}

<<<<<<< HEAD
export type IUseRentoraApiMaintenanceDetail = IBaseUseQuery<IRentoraApiClientMaintenanceDetailResponse['data']>

export type IRentoraApiClientMaintenanceDetailResponse = IRentoraApiClientBaseResponse<IMaintenanceDetail>

export type IRentoraApiMaintenanceDetailParams = {
=======
//Maintenance detail type
export type IMaintenanceDetail = IMaintenance

//detail response type
export type IRentoraApiClientMaintenanceDetailResponse = IRentoraApiClientBaseResponse<IMaintenanceDetail>

//hooks type useRentoraApiMaintenanceDetail
export type IUseRentoraApiMaintenanceDetail = IBaseUseQuery<IRentoraApiClientMaintenanceDetailResponse['data']>

//Maintenance detail params
export type IRentoraApiMaintenanceDetailParams = {
  apartmentId: string
>>>>>>> feat/REN-112-Hook-Maintenance
  maintenanceId: string
}
