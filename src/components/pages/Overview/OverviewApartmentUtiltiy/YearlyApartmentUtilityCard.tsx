import { Card } from '@/components/common'
import type { IYearlyApartmentUtility } from '@/types'

import { YearlyUtilityElectChart } from '.'

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
        <h3 className="text-start font-bold">Yearly Apartment Utility</h3>
      </div>
      <div className="desktop:flex-col justify-items-between-start flex flex-row gap-2">
        <YearlyUtilityElectChart item={item} isLoading={isLoading} />
      </div>
    </Card>
  )
}

export default YearlyApartmentUtilityCard
