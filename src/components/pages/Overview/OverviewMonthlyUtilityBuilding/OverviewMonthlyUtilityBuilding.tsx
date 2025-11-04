import { useParams } from 'react-router-dom'

import { Card } from '@/components/common'
import { EmptyPage, LoadingPage } from '@/components/ui'
import { useRentoraApiMonthlyUtilityBuildings } from '@/hooks/api/queries/useRentoraApiMonthlyUtilityBuilding'

import MonthlyUtilityBuildingElectChart from './MonthlyUtilityBuildingElectChart'
import MonthlyUtilityBuildingWaterChart from './MonthlyUtilityBuildingWaterChart'

const OverviewMonthlyUtilityBuilding = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { data: monthlyUtilityBuilding, isLoading: monthlyUtiltiyBuildingLoading } =
    useRentoraApiMonthlyUtilityBuildings({
      apartmentId: apartmentId!,
    })

  if (monthlyUtiltiyBuildingLoading) {
    return <LoadingPage />
  }

  if (!monthlyUtilityBuilding) {
    return <EmptyPage title="Monthly Utility not found" description="No Monthly Utility you looking for." />
  }
  return (
    <Card className="rounded-2xl shadow-lg hover:shadow-xl">
      <h2>{monthlyUtilityBuilding.buildingName}</h2>
      <div className="desktop:flex-row justify-items-between-start flex flex-col gap-x-2">
        <MonthlyUtilityBuildingElectChart />
        <MonthlyUtilityBuildingWaterChart />
      </div>
    </Card>
  )
}
export default OverviewMonthlyUtilityBuilding
