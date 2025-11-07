import type {
  IBasePaginateQueryResult,
  IBaseUseQuery,
  IRentoraApiClientBasePaginateWithMetadataResponse,
} from '../base-api'

//data
export type IMonthtlyUtilityFloor = {
  buildingId: string
  buildingName: string
  floorNumber: number
  floorName: string
  utilityGroupName: IUtilityFloorGroup
}

export type IUtilityFloorGroup = {
  water: Array<IUtilityFloorData>
  electric: Array<IUtilityFloorData>
}

export type IUtilityFloorData = {
  month: string
  totalFloorUsage: number
}

//metadata
export type IMonthtlyUtilityFloorMetadata = {
  totalUtilityFloor: number
}

//params
export type IMonthtlyUtilityFloorParams = {
  apartmentId: string
}

export type IRentoraApiMonthlyUtilityFloorParams = {
  buildingId: string
  floorId?: string
  page?: number
  size?: number
  search?: string
  sortBy?: 'name' | 'createdAt' | 'updatedAt'
  sortDir?: 'asc' | 'desc'
}

export type IuseRentoraApiMonthlyUtilityFloorList = IBaseUseQuery<IRentoraApiMonthlyUtilityFloorListResponse['data']>

//response
export type IRentoraApiMonthlyUtilityFloorListResponse = IRentoraApiClientBasePaginateWithMetadataResponse<
  IMonthtlyUtilityFloor,
  IMonthtlyUtilityFloorMetadata
>

//hook result
export type IUseRentoraApiMonthlyUtilityFloor = IBasePaginateQueryResult<
  IRentoraApiMonthlyUtilityFloorListResponse['data']
>
