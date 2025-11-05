import { Card } from '@/components/common'
import { LoadingPage } from '@/components/ui'
import type { IMonthlyUtilityBuilding } from '@/types'

// import MonthlyUtilityBuildingElectChart from './MonthlyUilityBuildingElectChart'
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
        <p>{item.buildingID}</p>
      </div>
      <div className="desktop:flex-row justify-items-between-start flex flex-col gap-x-2">
        {/* <MonthlyUtilityBuildingElectChart /> */}
        <MonthlyUtilityBuildingWaterChart />
      </div>
    </Card>
  )
}
export default MonthlyUtilityBuildingCard
