import type { IBaseUseMutation, IRentoraApiClientBaseResponse } from '@/types'

export type IUnitServiceExecuteBasePayload = {
  serviceId: string
}

//payload
export type ICreateUnitServiceRequestPayload = IUnitServiceExecuteBasePayload

//params
export type ICreateUnitServiceResponseParams = {
  apartmentId?: string
  unitId?: string
}

export type IDeleteUnitServiceRequestParams = {
  apartmentId?: string
  unitId?: string
}

export type IUseRentoraApiCreateUnitService = IBaseUseMutation<void, IUnitServiceExecuteBasePayload>

//delete unit service hook
export type IRenotaApiDeleteUnitService = IBaseUseMutation<void, IUnitServiceExecuteBasePayload>

//delete unit service response type
export type IRenotaApiDeleteUnitServicePayload = IUnitServiceExecuteBasePayload
