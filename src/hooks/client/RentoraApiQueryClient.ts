import type { AxiosResponse } from 'axios'

import type {
  IRentoraApiApartmentDetailParams,
  IRentoraApiApartmentListParams,
  IRentoraApiClientApartmentDetailResponse,
  IRentoraApiClientApartmentListResponse,
  IRentoraApiClientInvoiceDetailResponse,
  IRentoraApiClientInvoiceListResponse,
  IRentoraApiClientMaintenanceDetailResponse,
  IRentoraApiClientMaintenanceListResponse,
  IRentoraApiClientOverdueInvoiceListResponse,
  IRentoraApiClientReadingUnitUtilityResponse,
  IRentoraApiClientReportUtilityListResponse,
  IRentoraApiClientTenantDetailResponse,
  IRentoraApiClientTenantListResponse,
  IRentoraApiClientUnitListResponse,
  IRentoraApiClientUserResponse,
  IRentoraApiInvoiceListParams,
  IRentoraApiMaintenanceApartmentIdParams,
  IRentoraApiMaintenanceDetailParams,
  IRentoraApiMaintenanceListParams,
  IRentoraApiOverdueInvoiceListParams,
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
    maintenanceList: 'MAINTENANCE_LIST',
    maintenanceDetail: 'MAINTENANCE_DETAIL',
    invoiceList: 'INVOICE_LIST',
    overdueInvoiceList: 'OVERDUE_INVOICE_LIST',
    invoiceDetail: 'INVOICE_DETAIL',
    tenantList: 'TENANT_LIST',
    tenantDetail: 'TENANT_DETAIL',
    unitList: 'UNIT_LIST',
    reportUtilityList: 'REPORT_UTILITY_LIST',
    reportReadingDateUtility: 'REPORT_READING_DATE_UTILITY',
    getUserData: 'GET_USER_DATA',
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

  async getUserData(): Promise<IRentoraApiClientUserResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientUserResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientUserResponse>(`/api/auth/me`)
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

  async maintenanceList(
    params: IRentoraApiMaintenanceListParams,
    apartmentId: IRentoraApiMaintenanceApartmentIdParams,
  ): Promise<IRentoraApiClientMaintenanceListResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientMaintenanceListResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientMaintenanceListResponse>(
        `/api/apartment/${apartmentId}/maintenance`,
        {
          params,
        },
      )
    return response.data.data
  }

  async invoiceList(
    apartmentId: Maybe<string>,
    params: IRentoraApiInvoiceListParams,
  ): Promise<IRentoraApiClientInvoiceListResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientInvoiceListResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientInvoiceListResponse>(`/api/invoices/${apartmentId}`, {
        params,
      })
    return response.data.data
  }

  async overdueInvoiceList(
    apartmentId: Maybe<string>,
    params: IRentoraApiOverdueInvoiceListParams,
  ): Promise<IRentoraApiClientOverdueInvoiceListResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientOverdueInvoiceListResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientOverdueInvoiceListResponse>(
        `/api/invoices/${apartmentId}/overdue`,
        {
          params,
        },
      )
    return response.data.data
  }

  async maintenanceDetail(
    payload: IRentoraApiMaintenanceDetailParams,
  ): Promise<IRentoraApiClientMaintenanceDetailResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientMaintenanceDetailResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientMaintenanceDetailResponse>(
        `/api/apartment/${payload.apartmentId}/maintenance/${payload.maintenanceId}`,
      )
    return response.data.data
  }

  async invoiceDetail(
    apartmentId: Maybe<string>,
    adhocInvoiceId: Maybe<string>,
  ): Promise<IRentoraApiClientInvoiceDetailResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientInvoiceDetailResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientInvoiceDetailResponse>(
        `/api/invoices/${apartmentId}/detail/${adhocInvoiceId}`,
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

  async readingUnitUtility(apartmentId: Maybe<string>) {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientReadingUnitUtilityResponse>(
      `/api/apartments/report/${apartmentId}/reading/date/utility`,
    )
    return response.data.data
  }
}
