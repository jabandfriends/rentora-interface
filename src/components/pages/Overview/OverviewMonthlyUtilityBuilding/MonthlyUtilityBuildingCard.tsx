import { Card, CardContent } from '@/components/common'
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
    <Card className="flex-col gap-6 rounded-2xl p-6 shadow-lg hover:shadow-xl">
      <div className="flex justify-start">
        <h3 className="text-start font-bold">{item.buildingName}</h3>
      </div>
      <CardContent>
        <div className="desktop:grid desktop:grid-cols-2 flex flex-col gap-6">
          <MonthlyUtilityBuildingElectChart item={item} isLoading={isloading} />
          <MonthlyUtilityBuildingWaterChart item={item} isLoading={isloading} />
        </div>
      </CardContent>
    </Card>
  )
}
export default MonthlyUtilityBuildingCard
