import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '@/types'

export type IMonthlyUtilityBuilding = {
  id: string
  buildingName: string
  utilityGroupName: IUtilityTotalGroup
}

export type IUtilityTotalGroup = {
  water: Array<IUtilityBuildingData>
  electric: Array<IUtilityBuildingData>
}

export type IUtilityBuildingData = {
  month: string
  usageAmount: number
}

export type IMonthlyUtilityBuldingParams = {
  apartmentId: string
}

export type IRentoraApiClietMonthlyUtilityBuildingResponse = IRentoraApiClientBaseResponse<IMonthlyUtilityBuilding>
export type IUseRentoraApiMonthlyUtilityBuilding = IBaseUseQuery<IRentoraApiClietMonthlyUtilityBuildingResponse['data']>
