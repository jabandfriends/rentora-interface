import type { AxiosResponse } from 'axios'

import type {
  IAuthRequest,
  ICreateAdhocInvoiceRequestPayload,
  ICreateApartmentRequestApi,
  ICreateBuildingRequestPayload,
  ICreateContractRequestPayload,
  ICreateFloorRequestPayload,
  ICreateMaintenanceRequestPayload,
  ICreateTenantRequestPayload,
  ICreateUnitRequestPayload,
  ICreateUnitServiceRequestPayload,
  IDeleteUnitServiceParams,
  IFirsttimePasswordResetRequestPayload,
  IGenerateMonthlyInvoiceRequestPayload,
  IMeterReadingRequestPayload,
  IMeterReadingUpdateRequestPayload,
  IPutPresignedUrlRequest,
  IRentoraApiClientAuthenticateResponse,
  IRentoraApiClientCreateAdhocInvoiceResponse,
  IRentoraApiClientCreateApartmentResponse,
  IRentoraApiClientCreateMaintenanceResponse,
  IRentoraApiClientDeleteMaintenanceResponse,
  IRentoraApiClientUpdateMaintenanceResponse,
  ISetupApartmentRequestPayload,
  ITerminateContractRequestPayload,
  IUpdateApartmentRequestPayload,
  IUpdateBuildingRequestPayload,
  IUpdateFloorPayload,
  IUpdateMaintenanceRequestPayload,
  IUpdateTenantPasswordRequestPayload,
  IUpdateTenantRequestPayload,
  IUpdateUnitRequestPayload,
  IUpdateUnitServiceRequestPayload,
  RentoraApiExecuteClientKey,
} from '@/types'

import { RentoraApiBaseClient } from './RentoraApiBaseClient'

export class RentoraApiExecuteClient extends RentoraApiBaseClient {
  readonly key: Record<RentoraApiExecuteClientKey, string> = {
    authenticate: 'AUTHENTICATE',
    createApartment: 'CREATE_APARTMENT',
    putPresignedUrl: 'PUT_PRESIGNED_URL',
    setupApartment: 'SETUP_APARTMENT',
    firstTimePasswordReset: 'FIRST_TIME_PASSWORD_RESET',
    createMaintenance: 'CREATE_MAINTENANCE',
    updateMaintenance: 'UPDATE_MAINTENANCE',
    deleteMaintenance: 'DELETE_MAINTENANCE',
    createTenant: 'CREATE_TENANT',
    updateTenant: 'UPDATE_TENANT',
    updateTenantPassword: 'UPDATE_TENANT_PASSWORD',
    createContract: 'CREATE_CONTRACT',
    createAdhocInvoice: 'CREATE_ADHOC_INVOICE',
    createMeterReading: 'CREATE_METER_READING',
    updateMeterReading: 'UPDATE_METER_READING',
    generateMonthlyInvoice: 'GENERATE_MONTHLY_INVOICE',
    updateApartment: 'UPDATE_APARTMENT',
    createUnitService: 'CREATE_UNIT_SERVICE',
    deleteUnitService: 'DELETE_UNIT_SERVICE',
    updateUnitService: 'UPDATE_UNIT_SERVICE',
    createFloor: 'CREATE_FLOOR',
    updateFloor: 'UPDATE_FLOOR',
    deleteFloor: 'DELETE_FLOOR',
    createBuilding: 'CREATE_BUILDING',
    updateBuilding: 'UPDATE_BUILDING',
    deleteBuilding: 'DELETE_BUILDING',

    //unit
    createUnit: 'CREATE_UNIT',
    updateUnit: 'UPDATE_UNIT',
    deleteUnit: 'DELETE_UNIT',
    terminateContract: 'TERMINATE_CONTRACT',
  }

  async authenticate(payload: IAuthRequest): Promise<IRentoraApiClientAuthenticateResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientAuthenticateResponse, unknown> =
      await this.axiosInstance.post<IRentoraApiClientAuthenticateResponse>(`/api/auth/login`, payload)
    return response.data.data
  }

  async createApartment(
    payload: ICreateApartmentRequestApi,
  ): Promise<IRentoraApiClientCreateApartmentResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientCreateApartmentResponse, unknown> =
      await this.axiosWithAuthInstance.post<IRentoraApiClientCreateApartmentResponse>(`/api/apartments`, payload)
    return response.data.data
  }

  //presigned url put
  async putPresignedUrl(payload: IPutPresignedUrlRequest): Promise<void> {
    await this.axiosInstance.put(payload.presignedUrl, payload.imgFile)
  }

  //setup
  async setupApartment(payload: ISetupApartmentRequestPayload): Promise<void> {
    const { apartmentId, ...rest } = payload
    const response = await this.axiosWithAuthInstance.post<void>(`/api/apartments/setup/${apartmentId}`, rest)
    return response.data
  }

  async firstTimePasswordReset(payload: IFirsttimePasswordResetRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.post<void>(`/api/auth/first-password`, payload)
    return response.data
  }

  async createMaintenance(
    apartmentId: string,
    payload: ICreateMaintenanceRequestPayload,
  ): Promise<IRentoraApiClientCreateMaintenanceResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientCreateMaintenanceResponse, unknown> =
      await this.axiosWithAuthInstance.post<IRentoraApiClientCreateMaintenanceResponse>(
        `/api/apartment/${apartmentId}/maintenance/users/create`,
        payload,
      )
    return response.data.data
  }

  async updateMaintenance(
    apartmentId: string,
    maintenanceId: string,
    payload: IUpdateMaintenanceRequestPayload,
  ): Promise<IRentoraApiClientUpdateMaintenanceResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientUpdateMaintenanceResponse, unknown> =
      await this.axiosWithAuthInstance.put<IRentoraApiClientUpdateMaintenanceResponse>(
        `/api/apartment/${apartmentId}/maintenance/${maintenanceId}`,
        payload,
      )
    return response.data.data
  }

  async deleteMaintenance(
    apartmentId: string,
    maintenanceId: string,
  ): Promise<IRentoraApiClientDeleteMaintenanceResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientDeleteMaintenanceResponse, unknown> =
      await this.axiosWithAuthInstance.delete<IRentoraApiClientDeleteMaintenanceResponse>(
        `/api/apartment/${apartmentId}/maintenance/${maintenanceId}`,
      )
    return response.data.data
  }

  //create tenant
  async createTenant(apartmentId: string, payload: ICreateTenantRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.post<void>(
      `/api/apartments/manage/tenant/${apartmentId}`,
      payload,
    )
    return response.data
  }

  //update tenant
  async updateTenant(userId: string, payload: IUpdateTenantRequestPayload): Promise<void> {
    // /api/apartments/manage/tenant/update/:userId
    const response = await this.axiosWithAuthInstance.put<void>(
      `/api/apartments/manage/tenant/update/${userId}`,
      payload,
    )
    return response.data
  }

  //update password
  async updatePassword(userId: string, payload: IUpdateTenantPasswordRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.put<void>(
      `/api/apartments/manage/tenant/update/password/${userId}`,
      payload,
    )
    return response.data
  }

  //create Contract
  async createContract(apartmentId: string, payload: ICreateContractRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.post<void>(`/api/apartments/${apartmentId}/contracts`, payload)
    return response.data
  }

  //create Adhoc Invoice
  async createAdhocInvoice(
    apartmentId: string,
    payload: ICreateAdhocInvoiceRequestPayload,
  ): Promise<IRentoraApiClientCreateAdhocInvoiceResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientCreateAdhocInvoiceResponse, unknown> =
      await this.axiosWithAuthInstance.post<IRentoraApiClientCreateAdhocInvoiceResponse>(
        `/api/invoices/${apartmentId}/adhocInvoice/create`,
        payload,
      )
    return response.data.data
  }

  //create meter reading
  async createMeterReading(apartmentId: string, payload: IMeterReadingRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.post<void>(`/api/apartments/${apartmentId}/unit/utility`, payload)
    return response.data
  }

  //update meter reading
  async updateMeterReading(apartmentId: string, payload: IMeterReadingUpdateRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.put<void>(`/api/apartments/${apartmentId}/unit/utility`, payload)
    return response.data
  }

  //generate monthly invoice
  async generateMonthlyInvoice(payload: IGenerateMonthlyInvoiceRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.post<void>(`/api/monthly/invoices`, payload)
    return response.data
  }

  //update apartment
  async updateApartment(apartmentId: string, payload: IUpdateApartmentRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.put<void>(`/api/apartments/${apartmentId}`, payload)
    return response.data
  }
  //create unit service
  async createUnitService(unitId: string, payload: ICreateUnitServiceRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.post<void>(`/api/apartments/unit/service/${unitId}`, payload)
    return response.data
  }

  //delete unit service
  async deleteUnitService(params: IDeleteUnitServiceParams): Promise<void> {
    const response = await this.axiosWithAuthInstance.delete<void>(`/api/apartments/unit/service`, {
      params,
    })
    return response.data
  }

  //terminate contract
  async terminateContract(
    apartmentId: string,
    roomNumber: string,
    payload: ITerminateContractRequestPayload,
  ): Promise<void> {
    const response = await this.axiosWithAuthInstance.post<void>(
      `/api/apartments/${apartmentId}/contracts/${roomNumber}/terminate`,
      payload,
    )
    return response.data
  }

  //update Utility service
  async updateUtilityService(apartmentId: string, payload: IUpdateUnitServiceRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.put<void>(`/api/apartments/${apartmentId}/utility`, payload)
    return response.data
  }

  //delete floor
  async deleteFloor(floorId: string): Promise<void> {
    const response = await this.axiosWithAuthInstance.delete<void>(`/api/apartments/floor/${floorId}`)
    return response.data
  }

  //create floor
  async createFloor(payload: ICreateFloorRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.post<void>(`/api/apartments/floor`, payload)
    return response.data
  }

  //update floor
  async updateFloor(floorId: string, payload: IUpdateFloorPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.put<void>(`/api/apartments/floor/${floorId}`, payload)
    return response.data
  }

  //create building
  async createBuilding(apartmentId: string, payload: ICreateBuildingRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.post<void>(`/api/apartments/${apartmentId}/buildings`, payload)
    return response.data
  }

  //update building
  async updateBuilding(apartmentId: string, buildingId: string, payload: IUpdateBuildingRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.put<void>(
      `/api/apartments/${apartmentId}/buildings/${buildingId}`,
      payload,
    )
    return response.data
  }

  //delete building
  async deleteBuilding(apartmentId: string, buildingId: string): Promise<void> {
    const response = await this.axiosWithAuthInstance.delete<void>(
      `/api/apartments/${apartmentId}/buildings/${buildingId}`,
    )
    return response.data
  }

  //create unit
  async createUnit(apartmentId: string, payload: ICreateUnitRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.post<void>(`/api/apartments/${apartmentId}/units`, payload)
    return response.data
  }

  //update unit
  async updateUnit(apartmentId: string, unitId: string, payload: IUpdateUnitRequestPayload): Promise<void> {
    const response = await this.axiosWithAuthInstance.put<void>(
      `/api/apartments/${apartmentId}/units/${unitId}`,
      payload,
    )
    return response.data
  }

  //delete unit
  async deleteUnit(apartmentId: string, unitId: string): Promise<void> {
    const response = await this.axiosWithAuthInstance.delete<void>(`/api/apartments/${apartmentId}/units/${unitId}`)
    return response.data
  }
}
