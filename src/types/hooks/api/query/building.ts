import type { IBaseUseQuery, IRentoraApiClientBaseResponse, Maybe } from '@/types'

export type IBuilding = {
  id: string
  name: string
  description: Maybe<string>
  totalFloors: number
  buildingType: string
  status: string
  apartmentName: string
  createdAt: string
  floorCount: number
  unitCount: number
  occupiedUnitCount: number
}

export type IRentoraApiClientBuildingListResponse = IRentoraApiClientBaseResponse<Array<IBuilding>>
export type IUseRentoraApiClientBuildingListResponse = IBaseUseQuery<IRentoraApiClientBuildingListResponse['data']>

//response
export type IRentoraApiClientBuildingDetailResponse = IRentoraApiClientBaseResponse<IBuilding>
export type IUseRentoraApiClientBuildingDetailResponse = IBaseUseQuery<IRentoraApiClientBuildingDetailResponse['data']>
