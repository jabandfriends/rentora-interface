import { useMutation } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient } from '@/hooks'
import type {
  ICreateApartmentRequestApi,
  ICreateApartmentRequestPayload,
  IRentoraApiClientCreateApartmentResponse,
  IUseRentoraApiCreateApartment,
} from '@/types'

export const useRentoraApiCreateApartment = (): IUseRentoraApiCreateApartment => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)

  return useMutation<IRentoraApiClientCreateApartmentResponse['data'], Error, ICreateApartmentRequestPayload>({
    mutationKey: [rentoraApiExecuteClient.key.createApartment],
    mutationFn: async (
      payload: ICreateApartmentRequestPayload,
    ): Promise<IRentoraApiClientCreateApartmentResponse['data']> => {
      const response: IRentoraApiClientCreateApartmentResponse['data'] = await rentoraApiExecuteClient.createApartment({
        ...payload,
        ...(payload.logoFile && { logoFileName: payload.logoFile.name }),
      } as ICreateApartmentRequestApi)

      if (!payload.logoFile) {
        return response
      }

      //put presigned url
      await rentoraApiExecuteClient.putPresignedUrl({
        imgFile: payload.logoFile,
        presignedUrl: response.presignedUrl,
      })
      //apartment data
      return response
    },
  })
}
