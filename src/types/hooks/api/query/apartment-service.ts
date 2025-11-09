import type { ServiceCategory } from '@/enum'
import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '@/types'

export type IUseRentoraApiApartmentServices = IBaseUseQuery<IRentoraApiClientApartmentServiceResponse['data']>

export type IRentoraApiApartmentServiceParams = {
  apartmentId?: string
  activeService?: boolean
}

export type IRentoraApiClientApartmentServiceResponse = IRentoraApiClientBaseResponse<Array<IApartmentService>>
export type IApartmentService = {
  id: string
  serviceName: string
  isActive: boolean
  category: ServiceCategory
  price: number
}
