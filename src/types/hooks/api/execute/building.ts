import type { IBaseUseMutation } from '..'

type IBuildingBasePayload = {
  name: string
  description?: string
  totalFloors: number
}

export type ICreateBuildingRequestPayload = {
  apartmentId: string
} & IBuildingBasePayload

export type IUpdateBuildingRequestPayload = Partial<IBuildingBasePayload>

//hook
export type IUseRentoraApiCreateBuilding = IBaseUseMutation<void, ICreateBuildingRequestPayload>
export type IUseRentoraApiUpdateBuilding = IBaseUseMutation<void, IUpdateBuildingRequestPayload>
