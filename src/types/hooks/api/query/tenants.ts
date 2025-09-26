import type { IBasePaginateQueryResult, IRentoraApiClientBasePaginateWithMetadataResponse } from '@/types'

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

export type ITenantListMetadata = {
  totalTenants: number
  totalOccupiedTenants: number
  totalUnoccupiedTenants: number
  totalActiveTenants: number
}

//hook
export type IUseRentoraApiTenantList = IBasePaginateQueryResult<IRentoraApiClientTenantListResponse['data']>

export type IRentoraApiClientTenantListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  ITenant,
  ITenantListMetadata
>

//param
export type IRentoraApiTenantListParams = {
  page?: number
  size?: number
  isActive?: string
  name?: string
  sortBy?: 'createdAt' | 'updatedAt'
  sortDir?: 'asc' | 'desc'
}
