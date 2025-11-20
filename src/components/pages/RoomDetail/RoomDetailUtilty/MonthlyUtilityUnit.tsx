import { useParams } from 'react-router-dom'

import { Card } from '@/components/common'
import { LoadingPage, PageTableEmpty, Separator } from '@/components/ui'
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
    return (
      <Card className="rounded-2xl shadow-lg hover:shadow-xl">
        <div>
          <h3>Utility Usage</h3>
          <p className="text-body-2 text-theme-secondary">The utility usage of the unit.</p>
        </div>
        <Separator />
        <PageTableEmpty message="Monthly Utility not found" description="No Monthly Utility you looking for." />
      </Card>
    )
  }
  return (
    <Card className="rounded-2xl shadow-lg hover:shadow-xl">
      <div>
        <h3>Utility Usage</h3>
        <p className="text-body-2 text-theme-secondary">The utility usage of the unit.</p>
      </div>
      <div className="desktop:grid-cols-2 grid grid-cols-1 gap-4">
        <MonthlyUtilityUnitElectChart />
        <MonthlyUtilityUnitWaterChart />
      </div>
    </Card>
  )
}
export default MonthlyUtilityUnit
