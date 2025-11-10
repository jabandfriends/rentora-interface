import { Card } from '@/components/common'
import { LoadingPage, PageTableEmpty } from '@/components/ui'
import type { IMonthtlyUtilityFloor } from '@/types'

import MonthlyUtilityFloorElectChart from './MonthlyUtilityFloorElectChart'
import MonthlyUtilityFloorWaterChart from './MonthlyUtilityFloorWaterChart'

type IMonthlyUtilityFloorCard = {
  item: IMonthtlyUtilityFloor
  isLoading: boolean
}
const MonthlyUtilityFloorCard = ({ item, isLoading }: IMonthlyUtilityFloorCard) => {
  if (isLoading) {
    return <LoadingPage />
  }

  if (!item.floorName || item.floorName === null) {
    return <PageTableEmpty message="No Utility found for this floor" />
  }

  return (
    <Card className="flex-col gap-6 rounded-2xl shadow-lg hover:shadow-xl">
      <div className="flex justify-start">
        <h3 className="text-start font-bold">{item.floorName}</h3>
      </div>
      <div className="desktop:flex-col justify-items-between-start flex flex-row gap-2">
        <MonthlyUtilityFloorElectChart item={item} isLoading={isLoading} />
        <MonthlyUtilityFloorWaterChart item={item} isLoading={isLoading} />
      </div>
    </Card>
  )
}
export default MonthlyUtilityFloorCard
