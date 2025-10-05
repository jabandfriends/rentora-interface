import type { AxiosResponse } from 'axios'

import type {
  IRentoraApiApartmentDetailParams,
  IRentoraApiApartmentListParams,
  IRentoraApiClientApartmentDetailResponse,
  IRentoraApiClientApartmentListResponse,
  IRentoraApiClientTenantDetailResponse,
  IRentoraApiClientTenantListResponse,
  IRentoraApiClientUnitListResponse,
  IRentoraApiClientUserResponse,
  IRentoraApiTenantListParams,
  IRentoraApiUnitListParams,
  Maybe,
  RentoraApiQueryClientKey,
} from '@/types'

import { RentoraApiBaseClient as RentoraApiBaseClient } from './RentoraApiBaseClient'

export class RentoraApiQueryClient extends RentoraApiBaseClient {
  readonly key: Record<RentoraApiQueryClientKey, string> = {
    me: 'ME',
    apartmentList: 'APARTMENT_LIST',
    apartmentDetail: 'APARTMENT_DETAIL',
    tenantList: 'TENANT_LIST',
    tenantDetail: 'TENANT_DETAIL',
    unitList: 'UNIT_LIST',
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

  async tenantList(
    apartmentId: Maybe<string>,
    params: IRentoraApiTenantListParams,
  ): Promise<IRentoraApiClientTenantListResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientTenantListResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientTenantListResponse>(
        `/api/apartments/manage/tenant/${apartmentId}`,
        {
          params,
        },
      )
    return response.data.data
  }

  async tenantDetail(userId: Maybe<string>): Promise<IRentoraApiClientTenantDetailResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientTenantDetailResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientTenantDetailResponse>(
        `/api/apartments/manage/tenant/detail/${userId}`,
      )
    return response.data.data
  }

  async unitList(
    apartmentId: Maybe<string>,
    params: IRentoraApiUnitListParams,
  ): Promise<IRentoraApiClientUnitListResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientUnitListResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientUnitListResponse>(`/api/apartments/${apartmentId}/units`, {
        params,
      })
    return response.data.data
  }
}
