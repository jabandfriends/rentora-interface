import type { IBaseUseMutation, IRentoraApiClientBaseResponse } from '@/types'

export type IReadingContract = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  nationalId: string
  dateOfBirth: string
  emergencyContactName: string
  emergencyContactPhone: string
}

export type IRentoraApiReadingContractResponse = IRentoraApiClientBaseResponse<IReadingContract>

export type IUseRentoraApiCreateReadingContract = IBaseUseMutation<IRentoraApiReadingContractResponse['data'], File>
