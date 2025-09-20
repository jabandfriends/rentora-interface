import type { AxiosResponse } from 'axios'

import type {
  IRentoraApiApartmentListParams,
  IRentoraApiClientApartmentListResponse,
  RentoraApiQueryClientKey,
} from '@/types'

import { RentoraApiBaseClient as RentoraApiBaseClient } from './RentoraApiBaseClient'

export class RentoraApiQueryClient extends RentoraApiBaseClient {
  readonly key: Record<RentoraApiQueryClientKey, string> = {
    me: 'ME',
    apartmentList: 'APARTMENT_LIST',
  }

  async checkAuth(accessToken: string): Promise<void> {
    const { data }: AxiosResponse<void, unknown> = await this.axiosInstance.get<void>(`/api/auth/me`, {
      headers: {
        'Rentora-Auth-Token': accessToken,
      },
    })
    return data
  }

  async apartmentList(params: IRentoraApiApartmentListParams): Promise<IRentoraApiClientApartmentListResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientApartmentListResponse, unknown> =
      await this.axiosWithAuthInstance.get<IRentoraApiClientApartmentListResponse>(`/api/apartments`, {
        params,
      })
    return response.data.data
  }
}
