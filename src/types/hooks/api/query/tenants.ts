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
  role: string
  accountStatus: boolean
  occupiedStatus: boolean
  unitName: string
}

export type ITenantDetail = Omit<
  ITenant,
  'apartmentUserId' | 'accountStatus' | 'occupiedStatus' | 'unitName' | 'role'
> & {
  firstName: string
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

//hook
export type IUseRentoraApiTenantList = IBasePaginateQueryResult<IRentoraApiClientTenantListResponse['data']>
export type IUseRentoraApiTenantDetail = IBaseUseQuery<IRentoraApiClientTenantDetailResponse['data']>

//response
export type IRentoraApiClientTenantListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  ITenant,
  ITenantListMetadata
>
export type IRentoraApiClientTenantDetailResponse = IRentoraApiClientBaseResponse<ITenantDetail>

//param
export type IRentoraApiTenantListParams = {
  page?: number
  size?: number
  isActive?: string
  name?: string
  sortBy?: 'createdAt' | 'updatedAt'
  sortDir?: 'asc' | 'desc'
}
