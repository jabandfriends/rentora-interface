import type { AxiosResponse } from 'axios'

import type {
  IRentoraApiApartmentDetailParams,
  IRentoraApiApartmentListParams,
  IRentoraApiClientApartmentDetailResponse,
  IRentoraApiClientApartmentListResponse,
  IRentoraApiClientInvoiceDetailResponse,
  IRentoraApiClientInvoiceListResponse,
  IRentoraApiClientUserResponse,
  IRentoraApiInvoiceDetailParams,
  IRentoraApiInvoiceListParams,
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

  async invoiceDetail(
    payload: IRentoraApiInvoiceDetailParams,
  ): Promise<IRentoraApiClientInvoiceDetailResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientInvoiceDetailResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientInvoiceDetailResponse>(`/api/invoices/${payload.invoiceId}`)
    return response.data.data
  }
}
