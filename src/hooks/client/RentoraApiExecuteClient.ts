import type { AxiosResponse } from 'axios'

import type {
  IAuthRequest,
  ICreateApartmentRequestApi,
  ICreateTenantRequestPayload,
  IFirsttimePasswordResetRequestPayload,
  IPutPresignedUrlRequest,
  IRentoraApiClientAuthenticateResponse,
  IRentoraApiClientCreateApartmentResponse,
  ISetupApartmentRequestPayload,
  IUpdateTenantPasswordRequestPayload,
  IUpdateTenantRequestPayload,
  RentoraApiExecuteClientKey,
} from '@/types'

import { RentoraApiBaseClient } from './RentoraApiBaseClient'

export class RentoraApiExecuteClient extends RentoraApiBaseClient {
  readonly key: Record<RentoraApiExecuteClientKey, string> = {
    authenticate: 'AUTHENTICATE',
    createApartment: 'CREATE_APARTMENT',
    putPresignedUrl: 'PUT_PRESigned_URL',
    setupApartment: 'SETUP_APARTMENT',
    firstTimePasswordReset: 'FIRST_TIME_PASSWORD_RESET',
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
