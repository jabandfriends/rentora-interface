import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '..'

export type IFloor = {
  floorId: string
  floorName: string
  floorNumber: number
  totalUnits: number
  buildingId: string
  buildingName: string
}

export type IRentoraApiClientFloorListResponse = IRentoraApiClientBaseResponse<Array<IFloor>>

//hook
export type IUseFloorListQuery = IBaseUseQuery<IRentoraApiClientFloorListResponse['data']>
