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
    <div className="flex-col gap-6 rounded-2xl">
      <div className="flex justify-start">
        <h4 className="text-start font-semibold">{item.floorName}</h4>
      </div>
      <div className="desktop:grid-cols-2 grid grid-cols-1 gap-4">
        <MonthlyUtilityFloorElectChart item={item} isLoading={isLoading} />
        <MonthlyUtilityFloorWaterChart item={item} isLoading={isLoading} />
      </div>
    </div>
  )
}
export default MonthlyUtilityFloorCard
