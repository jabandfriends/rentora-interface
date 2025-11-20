import type { CONTRACT_RENTAL_TYPE, TENANT_ROLE } from '@/enum'
import type {
  IBasePaginateQueryResult,
  IBaseUseQuery,
  IRentoraApiClientBasePaginateWithMetadataResponse,
  IRentoraApiClientBaseResponse,
} from '@/types'

export type ITenant = {
  userId: string
  apartmentUserId: string
  fullName: string
  email: string
  phoneNumber: string
  createdAt: string
  role: TENANT_ROLE
  isActive: boolean
  accountStatus: boolean
  occupiedStatus: boolean
  unitName: string
}

export type ITenantDetail = Omit<ITenant, 'apartmentUserId' | 'accountStatus' | 'occupiedStatus' | 'unitName'> & {
  firstName: string
  apartmentUserId: string
  lastName: string
  nationalId: string
  dateOfBirth: string
  email: string
  emergencyContactName: string
  emergencyContactPhone: string
}

export type ITenantListMetadata = {
  totalTenants: number
  totalOccupiedTenants: number
  totalUnoccupiedTenants: number
  totalActiveTenants: number
}

export type ITenantCurrentContract = {
  roomNumber: string
  floorNumber: string
  buildingName: string
  startDate: string
  endDate: string
  daysRemaining: number
  rentalPrice: number
  depositAmount: number
  rentalType: CONTRACT_RENTAL_TYPE
  utilityUsage: Array<ITenantContractUtilityUsage>
  roomServices: Array<ITenantRoomService>
}

export type ITenantContractUtilityUsage = {
  utilityType: string
  readingDate: string
  totalCost: number
  beforeReading: number
  afterReading: number
  totalUsage: number
}

export type ITenantRoomService = {
  id: string
  serviceName: string
  servicePrice: number
  isActive: boolean
}

//hook
export type IUseRentoraApiTenantList = IBasePaginateQueryResult<IRentoraApiClientTenantListResponse['data']>
export type IUseRentoraApiTenantDetail = IBaseUseQuery<IRentoraApiClientTenantDetailResponse['data']>
export type IUseRentoraApiTenantCurrentContract = IBaseUseQuery<IRentoraApiClientTenantCurrentContractResponse['data']>
//response
export type IRentoraApiClientTenantListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  ITenant,
  ITenantListMetadata
>
export type IRentoraApiClientTenantDetailResponse = IRentoraApiClientBaseResponse<ITenantDetail>
export type IRentoraApiClientTenantCurrentContractResponse = IRentoraApiClientBaseResponse<ITenantCurrentContract>
//param
export type IRentoraApiTenantListParams = {
  page?: number
  size?: number
  isActive?: string
  name?: string
  sortBy?: 'createdAt' | 'updatedAt'
  sortDir?: 'asc' | 'desc'
}
