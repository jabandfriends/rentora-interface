import type { PaymentStatus, VerifiedStatus } from '@/enum'
import type { IBaseUseMutation, IRentoraApiClientBaseResponse } from '@/types'

export type IUpdatePaymentRequestPayload = Partial<{
  paymentId: string
  receiptFilename: string
  receiptFile: File
  verificationStatus: VerifiedStatus
  paymentStatus: PaymentStatus
}>

//response
export type IRentoraApiClientUpdatePaymentResponse = IRentoraApiClientBaseResponse<{
  paymentId: string
  presignedURL: string
}>

//hook update
export type IUseRentoraApiUpdatePayment = IBaseUseMutation<void, IUpdatePaymentRequestPayload>
