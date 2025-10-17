import type { UnitStatus } from '@/enum'
import type { IBaseUseMutation } from '@/types'

export type ICreateUnitRequestPayload = {
  floorId: string
  unitName: string
  bedrooms: number
  bathrooms: number
  squareMeters: number
  balconyCount: number
  parkingSpaces: number
}

export type IUpdateUnitParams = {
  apartmentId: string
  unitId: string
}
export type IUpdateUnitRequestPayload = Partial<{
  unitName: string
  bedrooms: number
  bathrooms: number
  squareMeters: number
  balconyCount: number
  parkingSpaces: number
  status: UnitStatus
}>

//hook
export type IUseCreateUnit = IBaseUseMutation<void, ICreateUnitRequestPayload>

//hook
export type IUseUpdateUnit = IBaseUseMutation<void, IUpdateUnitRequestPayload>
