import { useParams } from 'react-router-dom'

import { useRentoraApiMonthlyUtilityBuildings } from '@/hooks'
import type { IMonthlyUtilityBuilding } from '@/types'

import MonthlyUtilityBuildingCard from './MonthlyUtilityBuildingCard'

const OverviewMonthlyUtilityBuilding = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { data: monthlyUtiltyBuilding, isLoading } = useRentoraApiMonthlyUtilityBuildings({
    apartmentId: apartmentId!,
  })
  return (
    <div className="desktop:grid-cols-2 grid gap-4">
      {monthlyUtiltyBuilding?.map((item: IMonthlyUtilityBuilding, index: number) => (
        <MonthlyUtilityBuildingCard key={index} item={item} isloading={isLoading} />
      ))}
    </div>
  )
}

export default OverviewMonthlyUtilityBuilding
