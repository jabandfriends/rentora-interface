import { useParams } from 'react-router-dom'

import { EmptyPage, LoadingPage } from '@/components/ui'
import { useRentoraApiMonthlyUtilityUnit } from '@/hooks'

const MonthlyUtilityUnit = () => {
  const { apartmentId, id } = useParams<{ apartmentId: string; id: string }>()

  const { data: monthlyUtilityUnit, isLoading } = useRentoraApiMonthlyUtilityUnit({ apartmentId, unitId: id })

  if (isLoading) {
    return <LoadingPage />
  }

  if (!monthlyUtilityUnit) {
    return <EmptyPage title="Data Error" description="Cannot load utility data." />
  }
  return (
    <div>
      <h2>{monthlyUtilityUnit.unitName}</h2>
      <div className="desktop:flex-row justify-items-between-start flex flex-col gap-x-2">
        <p>Floor : {monthlyUtilityUnit.floorNumber}</p>
        <p>Building : {monthlyUtilityUnit.buildingName}</p>
      </div>
    </div>
  )
}
export default MonthlyUtilityUnit
