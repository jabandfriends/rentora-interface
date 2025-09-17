import type { RentoraApiQueryClientKey } from '@/types'

import { RentoraApiBaseClient as RentoraApiBaseClient } from './RentoraApiBaseClient'

export class RentoraApiQueryClient extends RentoraApiBaseClient {
  readonly key: Record<RentoraApiQueryClientKey, string> = {
    apartmentList: 'APARTMENT_LIST',
  }

  async apartmentList(): Promise<Array<any>> {
    // const { data }: AxiosResponse<void, unknown> = await this.axiosWithAuthInstance.get<void>(`/internal/v1/project`)
    return []
  }
}
