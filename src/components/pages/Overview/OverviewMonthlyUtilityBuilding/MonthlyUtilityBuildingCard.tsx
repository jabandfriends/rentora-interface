import { Card } from '@/components/common'
import { LoadingPage } from '@/components/ui'
import type { IMonthlyUtilityBuilding } from '@/types'

import MonthlyUtilityBuildingElectChart from './MonthlyUtilityBuildingElectChart'
import MonthlyUtilityBuildingWaterChart from './MonthlyUtilityBuildingWaterChart'

type IMonthlyUtilityBuildCard = {
  item: IMonthlyUtilityBuilding
  isloading: boolean
}
const MonthlyUtilityBuildingCard = ({ item, isloading }: IMonthlyUtilityBuildCard) => {
  if (isloading) {
    return <LoadingPage />
  }

  return (
    <Card className="flex-col gap-6 rounded-2xl shadow-lg hover:shadow-xl">
      <div className="flex justify-start">
        <h2 className="text-start font-bold">{item.buildingName}</h2>
      </div>
      <div className="desktop:flex-col justify-items-between-start flex flex-row gap-2">
        <MonthlyUtilityBuildingElectChart item={item} isLoading={isloading} />
        <MonthlyUtilityBuildingWaterChart item={item} isLoading={isloading} />
      </div>
    </Card>
  )
}
export default MonthlyUtilityBuildingCard
