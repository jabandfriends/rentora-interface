import type { IBaseUseMutation } from '..'

//update
type IBaseFloorExecute = {
  buildingId: string
  floorNumber: number
  floorName: string
  totalUnits: number
}

//hook update
export type IUpdateFloorPayload = Partial<IBaseFloorExecute>
export type IUseFloorUpdate = IBaseUseMutation<void, IUpdateFloorPayload>

//hook create
export type ICreateFloorRequestPayload = IBaseFloorExecute
export type IUseFloorCreate = IBaseUseMutation<void, ICreateFloorRequestPayload>
