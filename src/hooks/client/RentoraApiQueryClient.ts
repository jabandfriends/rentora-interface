import type { AxiosResponse } from 'axios'

import type {
  IRentoraApiApartmentDetailParams,
  IRentoraApiApartmentListParams,
  IRentoraApiClientApartmentDetailResponse,
  IRentoraApiClientApartmentListResponse,
  IRentoraApiClientMaintenanceDetailResponse,
  IRentoraApiClientUserResponse,
  IRentoraApiMaintenanceDetailParams,
  RentoraApiQueryClientKey,
} from '@/types'

import { RentoraApiBaseClient as RentoraApiBaseClient } from './RentoraApiBaseClient'

export class RentoraApiQueryClient extends RentoraApiBaseClient {
  readonly key: Record<RentoraApiQueryClientKey, string> = {
    me: 'ME',
    apartmentList: 'APARTMENT_LIST',
    apartmentDetail: 'APARTMENT_DETAIL',
    maintenanceDetail: 'MAINTENANCE_DETAIL',
  }

  async checkAuth(accessToken: string): Promise<IRentoraApiClientUserResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientUserResponse, unknown> =
      await this.axiosInstance.get<IRentoraApiClientUserResponse>(`/api/auth/me`, {
        headers: {
          'Rentora-Auth-Token': accessToken,
        },
      })
    return response.data.data
  }

  async apartmentList(params: IRentoraApiApartmentListParams): Promise<IRentoraApiClientApartmentListResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientApartmentListResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientApartmentListResponse>(`/api/apartments`, {
        params,
      })
    return response.data.data
  }

  async apartmentDetail(
    payload: IRentoraApiApartmentDetailParams,
  ): Promise<IRentoraApiClientApartmentDetailResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientApartmentDetailResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientApartmentDetailResponse>(
        `/api/apartments/${payload.apartmentId}`,
      )
    return response.data.data
  }

  async maintenanceDetail(
    payload: IRentoraApiMaintenanceDetailParams,
  ): Promise<IRentoraApiClientMaintenanceDetailResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientMaintenanceDetailResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientMaintenanceDetailResponse>(
        `/api/apartments/${payload.apartmentId}/maintenance/${payload.maintenanceId}`,
      )
    return response.data.data
  }
}
