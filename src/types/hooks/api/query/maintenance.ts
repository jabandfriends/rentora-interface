import type { MAINTENANCE_CATEGORY, MAINTENANCE_PRIORITY, MAINTENANCE_STATUS, RecurringSchedule } from '@/enum'
import type {
  IBasePaginateQueryResult,
  IBaseUseQuery,
  IRentoraApiClientBasePaginateResponse,
  IRentoraApiClientBasePaginateWithMetadataResponse,
  IRentoraApiClientBaseResponse,
  ISuppliesUsage,
  ISupply,
  Maybe,
} from '@/types'

//Maintenance type
export type IMaintenance = {
  id: string
  buildingsName: string
  unitName: string
  ticketNumber: string
  tenantName: string
  assignedToUserName: string
  title: string
  tenantPhoneNumber: string
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
  tenantEmail: string
  isEmergency: boolean
  isRecurring: boolean
  recurringSchedule: RecurringSchedule
  createdAt: string
  updatedAt: string
}

//hooks type useRentoraApiMaintenanceList
export type IUseRentoraApiMaintenanceList = IBasePaginateQueryResult<IRentoraApiClientMaintenanceListResponse['data']>

//metadata
export type IMaintenanceListMetadata = {
  totalMaintenance: number
  pendingCount: number
  inProgressCount: number
  completedCount: number
  urgentCount: number
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
  isRecurring?: boolean
  unitId?: string
  priority?: string
}

export type IRentoraApiMaintenanceApartmentIdParams = string

//Maintenance detail type
export type IMaintenanceDetail = IMaintenance & {
  unitId: string
  suppliesUsage?: Array<IMaintenanceSupplyUsage>
}
export type IMaintenanceSupplyUsage = ISuppliesUsage & {
  maintenanceSupplyId?: string
} & Pick<ISupply, 'supplyName' | 'supplyDescription' | 'supplyCategory' | 'supplyUnitPrice' | 'supplyUnit'>

//detail response type
export type IRentoraApiClientMaintenanceDetailResponse = IRentoraApiClientBaseResponse<IMaintenanceDetail>

//hooks type useRentoraApiMaintenanceDetail
export type IUseRentoraApiMaintenanceDetail = IBaseUseQuery<IRentoraApiClientMaintenanceDetailResponse['data']>

//Maintenance detail params
export type IRentoraApiMaintenanceDetailParams = {
  apartmentId: Maybe<string>
  maintenanceId: Maybe<string>
}

//Tenant Maintenance Info (simplified maintenance DTO)
export type IMaintenanceInfo = {
  id: string
  ticketNumber: string
  unitName: string
  buildingsName: string
  title: string
  appointmentDate: string
  dueDate: string
  status: MAINTENANCE_STATUS
  priority: MAINTENANCE_PRIORITY
  actualCost: number
  isRecurring: boolean
  recurringSchedule: RecurringSchedule | null
  createdAt: string
}

//Tenant maintenance list params
export type IRentoraApiTenantMaintenanceListParams = {
  page?: number
  size?: number
  sortBy?: string
  sortDir?: string
  status?: string
  isRecurring?: boolean
  priority?: string
}

//Tenant maintenance list response
export type IRentoraApiClientTenantMaintenanceListResponse = IRentoraApiClientBasePaginateResponse<IMaintenanceInfo>

//hooks type useRentoraApiTenantMaintenanceList
export type IUseRentoraApiTenantMaintenanceList = IBasePaginateQueryResult<
  IRentoraApiClientTenantMaintenanceListResponse['data']
>
