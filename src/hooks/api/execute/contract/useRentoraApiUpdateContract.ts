import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

import { RENTORA_API_BASE_URL } from '@/config'
import { RentoraApiExecuteClient, RentoraApiQueryClient } from '@/hooks'
import type {
  IRentoraApiClientUpdateContractResponse,
  IUpdateContractRequestPayload,
  IUseRentoraApiUpdateContract,
} from '@/types'

export const useRentoraApiUpdateContract = ({ apartmentId }: { apartmentId: string }): IUseRentoraApiUpdateContract => {
  const rentoraApiExecuteClient: RentoraApiExecuteClient = new RentoraApiExecuteClient(RENTORA_API_BASE_URL)
  const rentoraApiQueryClient: RentoraApiQueryClient = new RentoraApiQueryClient(RENTORA_API_BASE_URL)
  const queryClient: QueryClient = useQueryClient()
  return useMutation<void, Error, IUpdateContractRequestPayload>({
    mutationFn: async (payload: IUpdateContractRequestPayload) => {
      const { documentFile, ...rest } = payload
      const result: IRentoraApiClientUpdateContractResponse['data'] = await rentoraApiExecuteClient.updateContract(
        apartmentId,
        {
          documentFilename: documentFile?.name,
          ...rest,
        },
      )
      if (!result.presignedUrl) return
      if (!documentFile) return

      await rentoraApiExecuteClient.putPresignedUrl({
        imgFile: documentFile,
        presignedUrl: result.presignedUrl,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [rentoraApiQueryClient.key.contractDetail, apartmentId],
        exact: false,
      })
    },
  })
}
