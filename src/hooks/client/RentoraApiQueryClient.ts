import type { AxiosResponse } from 'axios'

import type {
  IRentoraApiApartmentDetailParams,
  IRentoraApiApartmentListParams,
  IRentoraApiClientApartmentDetailResponse,
  IRentoraApiClientApartmentListResponse,
  IRentoraApiClientReadingUnitUtilityResponse,
  IRentoraApiClientReportReceiptListResponse,
  IRentoraApiClientReportRoomListResponse,
  IRentoraApiClientReportUtilityListResponse,
  IRentoraApiClientTenantDetailResponse,
  IRentoraApiClientTenantListResponse,
  IRentoraApiClientUnitListResponse,
  IRentoraApiClientUserResponse,
  IRentoraApiReportUtilityListParams,
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
    reportUtilityList: 'REPORT_UTILITY_LIST',
    reportReadingDateUtility: 'REPORT_READING_DATE_UTILITY',
    reportRoomList: 'REPORT_ROOM_LIST',
    reportReceiptList: 'REPORT_RECEIPT_LIST',
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

  async reportUtilityList(
    apartmentId: Maybe<string>,
    params: IRentoraApiReportUtilityListParams,
  ): Promise<IRentoraApiClientReportUtilityListResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientReportUtilityListResponse>(
      `/api/apartments/report/${apartmentId}/utility`,
      {
        params,
      },
    )
    return response.data.data
  }

  async reportRoomList(
    apartmentId: Maybe<string>,
    params: any,
  ): Promise<IRentoraApiClientReportRoomListResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientReportRoomListResponse>(
      `/api/apartments/report/${apartmentId}/room-report`,
      { params },
    )
    return response.data.data
  }

  async reportReceiptList(
    apartmentId: Maybe<string>,
    params: any,
  ): Promise<IRentoraApiClientReportReceiptListResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientReportReceiptListResponse>(
      `/api/apartments/report/${apartmentId}/receipt-report`,
      { params },
    )
    return response.data.data
  }

  async readingUnitUtility(apartmentId: Maybe<string>) {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientReadingUnitUtilityResponse>(
      `/api/apartments/report/${apartmentId}/reading/date/utility`,
    )
    return response.data.data
  }
}
