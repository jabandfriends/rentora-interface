import { useParams } from 'react-router-dom'

import { Card } from '@/components/common'
import { EmptyPage, LoadingPage } from '@/components/ui'
import { useRentoraApiMonthlyUtilityUnit } from '@/hooks'

import MonthlyUtilityUnitElectChart from './MonthlyUtilityUnitElectChart'
import MonthlyUtilityUnitWaterChart from './MonthlyUtilityUnitWaterChart'

const MonthlyUtilityUnit = () => {
  const { apartmentId, id: unitId } = useParams<{ apartmentId: string; id: string }>()

  const { data: monthlyUtilityUnit, isLoading: monthlyUtiltiyUnitLoading } = useRentoraApiMonthlyUtilityUnit({
    apartmentId: apartmentId!,
    unitId: unitId!,
  })

  if (monthlyUtiltiyUnitLoading) {
    return <LoadingPage />
  }

  if (!monthlyUtilityUnit) {
    return <EmptyPage title="Monthly Utility not found" description="No Monthly Utility you looking for." />
  }
  return (
    <Card className="rounded-2xl shadow-lg hover:shadow-xl">
      <div>
        <h2>{monthlyUtilityUnit.unitName}</h2>
        <div className="desktop:flex-row justify-items-between-start flex flex-col gap-x-2">
          <p className="text-body-2 text-theme-secondary-600">Floor {monthlyUtilityUnit.floorNumber}</p>
          <p className="text-body-2 text-theme-secondary-600">Building {monthlyUtilityUnit.buildingName}</p>
        </div>
      </div>
      <div>
        <MonthlyUtilityUnitElectChart />
        <MonthlyUtilityUnitWaterChart />
      </div>
    </Card>
  )
}
export default MonthlyUtilityUnit
