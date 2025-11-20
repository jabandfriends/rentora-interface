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
    <div className="flex-col gap-6 rounded-2xl">
      <div className="flex justify-start">
        <h4 className="text-start font-bold">{item.buildingName}</h4>
      </div>
      <div className="justify-items-between-start desktop:grid-cols-2 grid grid-cols-1 gap-2">
        <MonthlyUtilityBuildingElectChart item={item} isLoading={isloading} />
        <MonthlyUtilityBuildingWaterChart item={item} isLoading={isloading} />
      </div>
    </div>
  )
}
export default MonthlyUtilityBuildingCard
