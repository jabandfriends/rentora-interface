import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '@/types'

export type IUseRentoraApiApartmentServices = IBaseUseQuery<IRentoraApiClientApartmentServiceResponse['data']>

export type IRentoraApiApartmentServiceParams = {
  apartmentId?: string
  unitId?: string
}

export type IRentoraApiClientApartmentServiceResponse = IRentoraApiClientBaseResponse<Array<IApartmentService>>
export type IApartmentService = {
  id: string
  serviceName: string
  price: number
}
