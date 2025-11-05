import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '@/types'

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

//params
export type IMonthlyUtilityBuldingParams = {
  apartmentId: string
}

export type IRentoraApiClietMonthlyUtilityBuildingResponse = IRentoraApiClientBaseResponse<
  Array<IMonthlyUtilityBuilding>
>
export type IUseRentoraApiMonthlyUtilityBuilding = IBaseUseQuery<IRentoraApiClietMonthlyUtilityBuildingResponse['data']>
