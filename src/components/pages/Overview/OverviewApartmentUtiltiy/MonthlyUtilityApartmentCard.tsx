import { Card, CardContent } from '@/components/common'
import { LoadingPage, PageTableEmpty } from '@/components/ui'
import type { IApartmentUtility } from '@/types'

import MonthlyUtilityApartmentElect from './MonthlyUtilityApartmentElect'
import MonthlyUtilityApartmentWater from './MonthlyUtilityApartmentWater'

type IMonthlyApartmentUtilityCard = {
  item?: IApartmentUtility
  isLoading: boolean
}

const MonthlyUtilityApartmentCard = ({ item, isLoading }: IMonthlyApartmentUtilityCard) => {
  if (isLoading) {
    return <LoadingPage />
  }

  if (!item) {
    return <PageTableEmpty message="No utility data found for this year" />
  }

  return (
    <Card className="flex-col gap-6 rounded-2xl p-6 shadow-lg hover:shadow-xl">
      <CardContent>
        <div className="desktop:grid desktop:grid-cols-2 flex flex-col gap-6">
          <MonthlyUtilityApartmentElect item={item} isLoading={isLoading} />
          <MonthlyUtilityApartmentWater item={item} isLoading={isLoading} />
        </div>
      </CardContent>
    </Card>
  )
}

export default MonthlyUtilityApartmentCard
