import { ChartColumnBig } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/common'
import { useRentoraApiYearlyApartmentUtility } from '@/hooks'

import { MonthlyUtilityApartmentSelect, YearlyApartmentUtilityCard } from './OverviewApartmentUtiltiy'

const OverviewYearlyApartmentUtility = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { data: yearlyApartmentUtility, isLoading } = useRentoraApiYearlyApartmentUtility({
    apartmentId: apartmentId!,
  })
  return (
    <Card className="justify-start rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartColumnBig className="h-5 w-5" />
          Building and Floor Utility
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <YearlyApartmentUtilityCard item={yearlyApartmentUtility} isLoading={isLoading} />
        <MonthlyUtilityApartmentSelect item={yearlyApartmentUtility} isLoading={isLoading} />
      </CardContent>
    </Card>
  )
}

export default OverviewYearlyApartmentUtility
