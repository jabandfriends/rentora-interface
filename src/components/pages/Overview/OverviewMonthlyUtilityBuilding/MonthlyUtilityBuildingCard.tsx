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
    <Card className="rounded-2xl shadow-lg hover:shadow-xl">
      <div>
        <h2>{item.buildingName}</h2>
      </div>
      <div className="desktop:flex-row justify-items-between-start flex flex-col gap-x-2">
        <MonthlyUtilityBuildingElectChart item={item} isLoading={isloading} />
        <MonthlyUtilityBuildingWaterChart item={item} isLoading={isloading} />
      </div>
    </Card>
  )
}
export default MonthlyUtilityBuildingCard
