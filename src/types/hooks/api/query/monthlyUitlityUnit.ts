import type { IBaseUseQuery, IRentoraApiClientBaseResponse } from '../base-api'

export type IMonthlyUtilityUnit = {
  id: string
  unitName: string
  floorNumber: number
  buildingName: string

  utilityGroupName: {
    water: Array<IUtilityUnitData>
    electric: Array<IUtilityUnitData>
  }
}

export type IUtilityUnitData = {
  month: string
  usageAmount: number
}

export type ImonthlyUtilityUnitParams = {
  apartmentId?: string
  unitId?: string
}

export type IRentoraApiClietMonthlyUtilityUnitResponse = IRentoraApiClientBaseResponse<IMonthlyUtilityUnit>
export type IUseRentoraApiMonthlyUtilityUnit = IBaseUseQuery<IRentoraApiClietMonthlyUtilityUnitResponse['data']>
