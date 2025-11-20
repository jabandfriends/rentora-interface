import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { LoadingPage, PageTableEmpty } from '@/components/ui'
import { useRentoraApiApartmetUtility } from '@/hooks'
import type { IYearlyApartmentUtility } from '@/types'

import MonthlyUtilityApartmentCard from './MonthlyUtilityApartmentCard'

const MonthlyUtilityApartmentSelect = ({
  item,
  isLoading,
}: {
  item?: Array<IYearlyApartmentUtility>
  isLoading: boolean
}) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const [selectedYear, setSelectedYear]: [string, Dispatch<SetStateAction<string>>] = useState('')

  useEffect(() => {
    if (item && item.length > 0 && selectedYear === '') {
      setSelectedYear(String(item[0].year))
    }
  }, [item, selectedYear])

  const { data: monthlySummary, isLoading: isLoadingSummary } = useRentoraApiApartmetUtility({
    apartmentId: apartmentId!,
    params: {
      year: Number(selectedYear)!,
    },
  })

  if (isLoading || isLoadingSummary) {
    return <LoadingPage />
  }

  if (!item || item.length === 0) {
    return <PageTableEmpty message="No historical data found to select a year." />
  }

  return (
    <div className="justify-center space-y-4 rounded-2xl">
      <div>
        <Select value={selectedYear} onValueChange={(value) => setSelectedYear(value)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {item.map((data: IYearlyApartmentUtility) => (
              <SelectItem key={data.year} value={String(data.year)}>
                <div className="flex items-center gap-2">
                  <span>{data.year}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <MonthlyUtilityApartmentCard item={monthlySummary} isLoading={isLoading} />
    </div>
  )
}

export default MonthlyUtilityApartmentSelect
