import type { IBaseUseMutation } from '@/types'

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

export type IUseRentoraApiCreateUnitService = IBaseUseMutation<void, IUnitServiceExecuteBasePayload>
