import type { MAINTENANCE_CATEGORY, MAINTENANCE_PRIORITY, MAINTENANCE_RECURRING, MAINTENANCE_STATUS } from '@/enum'
import type {
  IBasePaginateQueryResult,
  IBaseUseQuery,
  IRentoraApiClientBasePaginateWithMetadataResponse,
  IRentoraApiClientBaseResponse,
} from '@/types'

//Maintenance type
export type IMaintenance = {
  id: string
  buildingsName: string
  unitName: string
  ticketNumber: string
  unitId: string
  tenantUserId: string
  assignedToUserId: string
  title: string
  description: string
  category: MAINTENANCE_CATEGORY
  status: MAINTENANCE_STATUS
  priority: MAINTENANCE_PRIORITY
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
  recurringSchedule: MAINTENANCE_RECURRING
  createdAt: string
  updatedAt: string
}

//hooks type useRentoraApiMaintenanceList
export type IUseRentoraApiMaintenanceList = IBasePaginateQueryResult<IRentoraApiClientMaintenanceListResponse['data']>

//metadata
export type IMaintenanceListMetadata = {
  totalMaintenance: number
  pendingCount: number
  assignedCount: number
  inProgressCount: number
}

// response
export type IRentoraApiClientMaintenanceListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  IMaintenance,
  IMaintenanceListMetadata
>

export type IRentoraApiMaintenanceListParams = {
  page?: number
  size?: number
  search?: string
  sortBy?: string
  sortDir?: string
  status?: string
}

export type IRentoraApiMaintenanceApartmentIdParams = string

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
