import type { IBaseUseMutation } from '@/types'

export type IMeterReadingRequestPayload = {
  readingMonth: number
  readingYear: number
  rooms: Array<{
    unitId: string
    unitName: string
    waterStart: number
    waterEnd: number
    electricStart: number
    electricEnd: number
  }>
}

//hook
export type IUseRentoraApiCreateMeterReading = IBaseUseMutation<void, IMeterReadingRequestPayload>
