import type { AxiosResponse } from 'axios'

import type {
  IAuthRequest,
  ICreateApartmentRequestApi,
  ICreateMaintenanceRequestPayload,
  IFirsttimePasswordResetRequestPayload,
  IPutPresignedUrlRequest,
  IRentoraApiClientAuthenticateResponse,
  IRentoraApiClientCreateApartmentResponse,
  IRentoraApiClientCreateMaintenanceResponse,
  ISetupApartmentRequestPayload,
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
        `/api/apartment/${apartmentId}/maintenance`,
        payload,
      )
    return response.data.data
  }
}
