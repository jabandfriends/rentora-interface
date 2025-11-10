import { Card } from '@/components/common'
import type { IYearlyApartmentUtility } from '@/types'

import { YearlyUtilityElectChart, YearlyUtilityWaterChart } from '.'

const YearlyApartmentUtilityCard = ({
  item,
  isLoading,
}: {
  item?: Array<IYearlyApartmentUtility>
  isLoading: boolean
}) => {
  return (
    <Card className="flex-col gap-6 rounded-2xl shadow-lg hover:shadow-xl">
      <div className="flex justify-start">
        <h3 className="text-start font-bold">Year-over-Year Utility Usage</h3>
      </div>
      <div className="justify-items-between-start grid grid-cols-2 gap-2">
        <YearlyUtilityElectChart item={item} isLoading={isLoading} />
        <YearlyUtilityWaterChart item={item} isLoading={isLoading} />
      </div>
    </Card>
  )
}

export default YearlyApartmentUtilityCard
