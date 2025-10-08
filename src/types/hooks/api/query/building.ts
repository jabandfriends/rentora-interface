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
}

export type IRentoraApiClientBuildingListResponse = IRentoraApiClientBaseResponse<Array<IBuilding>>
export type IUseRentoraApiClientBuildingListResponse = IBaseUseQuery<IRentoraApiClientBuildingListResponse['data']>
