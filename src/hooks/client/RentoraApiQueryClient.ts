import type { AxiosResponse } from 'axios'

import type {
  IRentoraApiApartmentDetailParams,
  IRentoraApiApartmentListParams,
  IRentoraApiClientApartmentDetailResponse,
  IRentoraApiClientApartmentListResponse,
  IRentoraApiClientInvoiceDetailResponse,
  IRentoraApiClientInvoiceListResponse,
  IRentoraApiClientTenantDetailResponse,
  IRentoraApiClientTenantListResponse,
  IRentoraApiClientUserResponse,
  IRentoraApiInvoiceListParams,
  IRentoraApiTenantListParams,
  Maybe,
  RentoraApiQueryClientKey,
} from '@/types'

import { RentoraApiBaseClient as RentoraApiBaseClient } from './RentoraApiBaseClient'

export class RentoraApiQueryClient extends RentoraApiBaseClient {
  readonly key: Record<RentoraApiQueryClientKey, string> = {
    me: 'ME',
    apartmentList: 'APARTMENT_LIST',
    apartmentDetail: 'APARTMENT_DETAIL',
    invoiceList: 'INVOICE_LIST',
    invoiceDetail: 'INVOICE_DETAIL',
    tenantList: 'TENANT_LIST',
    tenantDetail: 'TENANT_DETAIL',
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

  async invoiceList(params: IRentoraApiInvoiceListParams): Promise<IRentoraApiClientInvoiceListResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientInvoiceListResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientInvoiceListResponse>(`/api/invoices`, {
        params,
      })
    return response.data.data
  }

  async invoiceDetail(invoiceId: Maybe<string>): Promise<IRentoraApiClientInvoiceDetailResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientInvoiceDetailResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientInvoiceDetailResponse>(`/api/invoices/detail/${invoiceId}`)
    return response.data.data
  }

  // async overdueList(params: IRentoraApiOverdueListParams): Promise<IRentoraApiClientInvoiceListResponse['data']> {
  //   const response: AxiosResponse<IRentoraApiClientInvoiceListResponse, unknown> =
  //     await this.axiosWithAuthInstance.get<IRentoraApiClientInvoiceListResponse>(`/api/invoices/overdue`, {
  //       params,
  //     })
  //   return response.data.data
  // }

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
}
