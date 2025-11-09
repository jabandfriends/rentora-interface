import { Card, CardContent } from '@/components/common'
import { LoadingPage, PageTableEmpty } from '@/components/ui'
import type { IApartmentUtility, IApartmentUtilityParams } from '@/types'

import MonthlyUtilityApartmentElect from './MonthlyUtilityApartmentElect'
import MonthlyUtilityApartmentWater from './MonthlyUtilityApartmentWater'

type IMonthlyApartmentUtilityCard = {
  props: IApartmentUtilityParams
  item?: IApartmentUtility
  isLoading: boolean
}

const MonthlyUtilityApartmentCard = ({ props, item, isLoading }: IMonthlyApartmentUtilityCard) => {
  if (isLoading) {
    return <LoadingPage />
  }

  if (!item) {
    return <PageTableEmpty message={`No utility data found for year ${props.year}.`} />
  }

  return (
    <Card className="flex-col gap-6 rounded-2xl p-6 shadow-lg hover:shadow-xl">
      <div className="flex justify-start border-b pb-3">
        <h3 className="text-start text-xl font-bold text-gray-800">{props.year} Annual Utility Summary</h3>
      </div>

      <CardContent className="p-0">
        <div className="grid gap-6 md:grid-cols-2">
          <MonthlyUtilityApartmentElect item={item} isLoading={isLoading} />
          <MonthlyUtilityApartmentWater item={item} isLoading={isLoading} />
        </div>
      </CardContent>
    </Card>
  )
}

export default MonthlyUtilityApartmentCard
