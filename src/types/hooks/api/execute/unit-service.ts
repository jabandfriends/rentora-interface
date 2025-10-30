import type { IBaseUseMutation } from '@/types'

export type IUnitServiceExecuteBasePayload = {
  serviceId: string
}

//payload
export type ICreateUnitServiceRequestPayload = IUnitServiceExecuteBasePayload

//params
export type ICreateUnitServiceParams = {
  unitId: string
}

export type IUseRentoraApiCreateUnitService = IBaseUseMutation<void, ICreateUnitServiceRequestPayload>

export type IDeleteUnitServiceParams = {
  unitServiceId: string
}
