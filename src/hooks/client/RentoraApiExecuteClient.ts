import type { AxiosResponse } from 'axios'

import type { IAuthRequest, IRentoraApiClientAuthenticateResponse, RentoraApiExecuteClientKey } from '@/types'

import { RentoraApiBaseClient } from './RentoraApiBaseClient'

export class RentoraApiExecuteClient extends RentoraApiBaseClient {
  readonly key: Record<RentoraApiExecuteClientKey, string> = {
    authenticate: 'AUTHENTICATE',
  }

  async authenticate(payload: IAuthRequest): Promise<IRentoraApiClientAuthenticateResponse['data']> {
    const response: AxiosResponse<IRentoraApiClientAuthenticateResponse, unknown> =
      await this.axiosInstance.post<IRentoraApiClientAuthenticateResponse>(`/api/auth/login`, payload)
    return response.data.data
  }

  // ex : create project
  // async createProject(payload: ICreateProjectRequest): Promise<void> {
  //   const { data }: AxiosResponse<void, unknown> = await this.axiosWithAuthInstance.post<void>(
  //     `/internal/v1/project`,
  //     payload,
  //   )
  //   return data
  // }
}
