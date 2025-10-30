import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '..'

export type IFloor = {
  floorId: string
  floorName: string
  floorNumber: number
  totalUnits: number
  buildingId: string
  buildingName: string
  occupiedUnits: number
  availableUnits: number
  maintenanceUnits: number
}

export type IRentoraApiClientFloorListResponse = IRentoraApiClientBaseResponse<Array<IFloor>>

//hook
export type IUseFloorListQuery = IBaseUseQuery<IRentoraApiClientFloorListResponse['data']>
