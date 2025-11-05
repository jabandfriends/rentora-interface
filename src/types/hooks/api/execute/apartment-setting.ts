import type { ServiceCategory } from '@/enum'
import type { IBaseUseMutation } from '@/types'

export type IBaseApartmentServiceRequestPayload = {
  serviceName: string
  price: number
  category: ServiceCategory
  isActive: boolean
}

export type ICreateApartmentServiceRequestPayload = IBaseApartmentServiceRequestPayload

export type IUpdateApartmentServiceRequestPayload = IBaseApartmentServiceRequestPayload & {
  apartmentServiceId: string
}

//hook
export type IUseRentoraApiCreateApartmentService = IBaseUseMutation<void, ICreateApartmentServiceRequestPayload>

export type IUseRentoraApiUpdateApartmentService = IBaseUseMutation<void, IUpdateApartmentServiceRequestPayload>
