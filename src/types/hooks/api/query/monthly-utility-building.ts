import type {
  IBasePaginateQueryResult,
  IBaseUseQuery,
  IRentoraApiClientBasePaginateWithMetadataResponse,
} from '@/types'

//data
export type IMonthlyUtilityBuilding = {
  buildingID: string
  buildingName: string
  utilityGroupName: IUtilityTotalGroup
}

export type IUtilityTotalGroup = {
  water: Array<IUtilityBuildingData>
  electric: Array<IUtilityBuildingData>
}

export type IUtilityBuildingData = {
  month: string
  totalUsageAmount: number
}

export type IMonthlyUtilityBuildingMetadata = {
  totalUtilityBuildings: number
}

//params
export type IMonthlyUtilityBuldingParams = {
  apartmentId: string
}

export type IRentoraApiMonthlyUtilityDetailParams = {
  page?: number
  size?: number
  search?: string
  sortBy?: 'name' | 'createdAt' | 'updatedAt'
  sortDir?: 'asc' | 'desc'
}

export type IuseRentoraApiMonthlyUtilityBuildingList = IBaseUseQuery<
  IRentoraApiMonthlyUtilityBuildingListResponse['data']
>

//response
export type IRentoraApiMonthlyUtilityBuildingListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  IMonthlyUtilityBuilding,
  IMonthlyUtilityBuildingMetadata
>

//hook
export type IUseRentoraApiMonthlyUtilityBuilding = IBasePaginateQueryResult<
  IRentoraApiMonthlyUtilityBuildingListResponse['data']
>
