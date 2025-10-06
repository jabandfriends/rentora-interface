import type { AxiosResponse } from 'axios'

import type {
  IAuthRequest,
  ICreateApartmentRequestApi,
  ICreateMaintenanceRequestPayload,
  ICreateTenantRequestPayload,
  IFirsttimePasswordResetRequestPayload,
  IPutPresignedUrlRequest,
  IRentoraApiClientAuthenticateResponse,
  IRentoraApiClientCreateApartmentResponse,
  IRentoraApiClientCreateMaintenanceResponse,
  IRentoraApiClientDeleteMaintenanceResponse,
  IRentoraApiClientUpdateMaintenanceResponse,
  ISetupApartmentRequestPayload,
  IUpdateMaintenanceRequestPayload,
  IUpdateTenantPasswordRequestPayload,
  IUpdateTenantRequestPayload,
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
        `/api/apartments/${apartmentId}/maintenance`,
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
        `/api/apartments/${apartmentId}/maintenance/${maintenanceId}`,
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
        `/api/apartments/${apartmentId}/maintenance/${maintenanceId}`,
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
}
