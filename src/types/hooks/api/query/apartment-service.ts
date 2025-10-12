export type IUseRentoraApiApartmentServices = {
  data?: IRentoraApiClientApartmentServiceResponse['data']
  isLoading: boolean
  isError: boolean
}

export type IRentoraApiApartmentServiceParams = {
  apartmentId: string
  unitId: string
}

export type IRentoraApiClientApartmentServiceResponse = {
  data: Array<IApartmentService>
}
export type IApartmentService = {
  id: string
  serviceName: string
  price: number
}
