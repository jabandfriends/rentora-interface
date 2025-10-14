import type { IBaseUseMutation } from '@/types'

type IMeterReading = {
  unitId: string
  unitName: string
  waterStart: number
  waterEnd: number
  electricStart: number
  electricEnd: number
}
export type IMeterReadingRequestPayload = {
  readingMonth: number
  readingYear: number
  rooms: Array<IMeterReading>
}

//hook
export type IUseRentoraApiCreateMeterReading = IBaseUseMutation<void, IMeterReadingRequestPayload>

//---------update------------
//payload
export type IMeterReadingUpdateRequestPayload = Omit<IMeterReading, 'unitId' | 'unitName'> & {
  waterUnitUtilityId: string
  electricUnitUtilityId: string
}

//hook
export type IUseRentoraApiUpdateMeterReading = IBaseUseMutation<void, IMeterReadingUpdateRequestPayload>
