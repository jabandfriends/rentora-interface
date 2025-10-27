import type { AxiosResponse } from 'axios'

import type {
  IRentoraApiAllUnitMonthlyInvoiceStatusParams,
  IRentoraApiApartmentDetailParams,
  IRentoraApiApartmentListParams,
  IRentoraApiClientAllUnitMonthlyInvoiceStatusResponse,
  IRentoraApiClientApartmentDetailResponse,
  IRentoraApiClientApartmentListResponse,
  IRentoraApiClientApartmentServiceResponse,
  IRentoraApiClientBuildingDetailResponse,
  IRentoraApiClientBuildingListResponse,
  IRentoraApiClientContractDetailResponse,
  IRentoraApiClientContractListResponse,
  IRentoraApiClientFloorListResponse,
  IRentoraApiClientInvoiceDetailResponse,
  IRentoraApiClientInvoiceListResponse,
  IRentoraApiClientMaintenanceDetailResponse,
  IRentoraApiClientMaintenanceListResponse,
  IRentoraApiClientMonthlyInvoiceDetailResponse,
  IRentoraApiClientMonthlyInvoiceListResponse,
  IRentoraApiClientOverdueInvoiceListResponse,
  IRentoraApiClientReadingUnitUtilityResponse,
  IRentoraApiClientReportUtilityListResponse,
  IRentoraApiClientTenantDetailResponse,
  IRentoraApiClientTenantListResponse,
  IRentoraApiClientUnitDetailResponse,
  IRentoraApiClientUnitListResponse,
  IRentoraApiClientUnitServiceResponse,
  IRentoraApiClientUnitUtilityAvailableMonthResponse,
  IRentoraApiClientUnitUtilityAvailableYearResponse,
  IRentoraApiClientUnitWithUtilityResponse,
  IRentoraApiClientUserResponse,
  IRentoraApiClientUtilityListResponse,
  IRentoraApiContractListParams,
  IRentoraApiInvoiceListParams,
  IRentoraApiMaintenanceApartmentIdParams,
  IRentoraApiMaintenanceDetailParams,
  IRentoraApiMaintenanceListParams,
  IRentoraApiMonthlyInvoiceListParams,
  IRentoraApiOverdueInvoiceListParams,
  IRentoraApiReportUtilityListParams,
  IRentoraApiTenantListParams,
  IRentoraApiUnitListParams,
  IRentoraApiUnitUtilityAvailableMonthParams,
  IRentoraApiUnitWithUtilityParams,
  Maybe,
  RentoraApiQueryClientKey,
} from '@/types'
import type {
  IRentoraApiClientPaymentListResponse,
  IRentoraApiPaymentListParams,
} from '@/types/hooks/api/query/payment'

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
    buildingListNoPaginate: 'BUILDING_LIST_NO_PAGINATE',
    contractDetail: 'CONTRACT_DETAIL',
    unitUtilityAvailableYear: 'UNIT_UTILITY_AVAILABLE_YEAR',
    unitUtilityAvailableMonth: 'UNIT_UTILITY_AVAILABLE_MONTH',
    unitWithUtility: 'UNIT_WITH_UTILITY',
    allUnitMonthlyInvoiceStatus: 'ALL_UNIT_MONTHLY_INVOICE_STATUS',
    monthlyInvoiceDetail: 'MONTHLY_INVOICE_DETAIL',
    apartmentServicesList: 'APARTMENT_SERVICE_LIST',
    unitServicesList: 'UNIT_SERVICE_LIST',
    utilityList: 'UTILITY_LIST',
    floorList: 'FLOOR_LIST',
    buildingDetail: 'BUILDING_DETAIL',
    unitDetail: 'UNIT_DETAIL',
    contractList: 'CONTRACT_LIST',
    monthlyInvoiceList: 'MONTHLY_INVOICE_LIST',
    paymentList: 'PAYMENT_LIST',
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

  async readingUnitUtility(apartmentId: Maybe<string>): Promise<IRentoraApiClientReadingUnitUtilityResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientReadingUnitUtilityResponse>(
      `/api/apartments/report/${apartmentId}/reading/date/utility`,
    )
    return response.data.data
  }

  async buildingListNoPaginate(apartmentId: Maybe<string>): Promise<IRentoraApiClientBuildingListResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientBuildingListResponse>(
      `/api/apartments/${apartmentId}/buildings/no/paginate`,
    )
    return response.data.data
  }

  async contractDetail(
    apartmentId: Maybe<string>,
    unitId: Maybe<string>,
  ): Promise<IRentoraApiClientContractDetailResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientContractDetailResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientContractDetailResponse>(
        `/api/apartments/${apartmentId}/contracts/unit/${unitId}`,
      )
    return response.data.data
  }

  //get all contract
  async contractList(
    apartmentId: Maybe<string>,
    params: IRentoraApiContractListParams,
  ): Promise<IRentoraApiClientContractListResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientContractListResponse>(
      `/api/apartments/${apartmentId}/contracts`,
      {
        params,
      },
    )
    return response.data.data
  }

  //unit utility (meter) available year
  async unitUtilityAvailableYear(
    apartmentId: Maybe<string>,
  ): Promise<IRentoraApiClientUnitUtilityAvailableYearResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientUnitUtilityAvailableYearResponse>(
      `/api/apartments/${apartmentId}/unit/utility/years`,
    )
    return response.data.data
  }

  //unit utility (meter) available month
  async unitUtilityAvailableMonth(
    apartmentId: Maybe<string>,
    params: IRentoraApiUnitUtilityAvailableMonthParams,
  ): Promise<IRentoraApiClientUnitUtilityAvailableMonthResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientUnitUtilityAvailableMonthResponse>(
      `/api/apartments/${apartmentId}/unit/utility/months`,
      {
        params,
      },
    )
    return response.data.data
  }

  //unit with utility
  async unitWithUtility(
    apartmentId: Maybe<string>,
    params: IRentoraApiUnitWithUtilityParams,
  ): Promise<IRentoraApiClientUnitWithUtilityResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientUnitWithUtilityResponse>(
      `/api/apartments/${apartmentId}/unit/utility`,
      {
        params,
      },
    )
    return response.data.data
  }

  //all unit with monthly invoice status
  async allUnitMonthlyInvoiceStatus(
    apartmentId: Maybe<string>,
    params: IRentoraApiAllUnitMonthlyInvoiceStatusParams,
  ): Promise<IRentoraApiClientAllUnitMonthlyInvoiceStatusResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientAllUnitMonthlyInvoiceStatusResponse>(
      `/api/apartments/${apartmentId}/units/monthly`,
      {
        params,
      },
    )
    return response.data.data
  }

  //apartment services list
  async apartmentServicesList(
    apartmentId: Maybe<string>,
    unitId: Maybe<string>,
  ): Promise<IRentoraApiClientApartmentServiceResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientApartmentServiceResponse>(
      `/api/apartments/${apartmentId}/all-room/detail/${unitId}/apartment-services`,
    )
    return response.data.data
  }

  //get monthly invoice detail
  async monthlyInvoiceDetail(
    invoiceNumber: Maybe<string>,
  ): Promise<IRentoraApiClientMonthlyInvoiceDetailResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientMonthlyInvoiceDetailResponse>(
      `/api/monthly/invoices/detail/${invoiceNumber}`,
    )
    return response.data.data
  }

  //get unit services list
  async unitServicesList(
    apartmentId: Maybe<string>,
    unitId: Maybe<string>,
  ): Promise<IRentoraApiClientUnitServiceResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientUnitServiceResponse>(
      `/api/apartments/${apartmentId}/all-room/detail/${unitId}`,
    )
    return response.data.data
  }

  //get utility by apartmentId
  async utilityList(apartmentId: Maybe<string>): Promise<IRentoraApiClientUtilityListResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientUtilityListResponse>(
      `/api/apartments/${apartmentId}/utility`,
    )
    return response.data.data
  }

  //get all floor by buildingId
  async floorList(buildingId: Maybe<string>): Promise<IRentoraApiClientFloorListResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientFloorListResponse>(
      `/api/apartments/floor/${buildingId}`,
    )
    return response.data.data
  }

  //get Building By id
  async buildingDetail(
    apartmentId: Maybe<string>,
    buildingId: Maybe<string>,
  ): Promise<IRentoraApiClientBuildingDetailResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientBuildingDetailResponse>(
      `/api/apartments/${apartmentId}/buildings/${buildingId}`,
    )
    return response.data.data
  }

  //get unit by id
  async unitDetail(
    apartmentId: Maybe<string>,
    unitId: Maybe<string>,
  ): Promise<IRentoraApiClientUnitDetailResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientUnitDetailResponse>(
      `/api/apartments/${apartmentId}/units/${unitId}`,
    )
    return response.data.data
  }
  //get all monthly invoice
  async monthlyInvoiceList(
    apartmentId: Maybe<string>,
    params: IRentoraApiMonthlyInvoiceListParams,
  ): Promise<IRentoraApiClientMonthlyInvoiceListResponse['data']> {
    const response = await this.axiosWithAuthInstance.get<IRentoraApiClientMonthlyInvoiceListResponse>(
      `/api/monthly/invoices/${apartmentId}`,
      {
        params,
      },
    )
    return response.data.data
  }

  //get payment list
  async paymentList(
    apartmentId: Maybe<string>,
    params: IRentoraApiPaymentListParams,
  ): Promise<IRentoraApiClientPaymentListResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientPaymentListResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientPaymentListResponse>(`/api/payments/${apartmentId}`, {
        params,
      })

    return response.data.data
  }
}
