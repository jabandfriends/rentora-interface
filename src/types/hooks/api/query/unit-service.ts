import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '@/types'

export type IUseRentoraApiUnitServices = IBaseUseQuery<IRentoraApiClientUnitServiceResponse['data']>

export type IRentoraApiUnitServiceParams = {
  apartmentId?: string
  unitId?: string
}

export type IRentoraApiClientUnitServiceResponse = IRentoraApiClientBaseResponse<Array<IUnitService>>
export type IUnitService = {
  id: string
  serviceName: string
  price: number
}
