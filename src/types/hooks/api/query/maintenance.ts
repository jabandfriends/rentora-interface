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
  createdAt: string
  updatedAt: string
}

export type IUseRentoraApiMaintenanceDetail = IBaseUseQuery<IRentoraApiClientMaintenanceDetailResponse['data']>

export type IRentoraApiClientMaintenanceDetailResponse = IRentoraApiClientBaseResponse<IMaintenanceDetail>

export type IRentoraApiMaintenanceDetailParams = {
  maintenanceId: string
}
