import { ChartColumnBig } from 'lucide-react'
import { useParams } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { useRentoraApiYearlyApartmentUtility } from '@/hooks'

import { MonthlyUtilityApartmentSelect } from './OverviewApartmentUtiltiy'

const OverviewYearlyApartmentUtility = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { data: yearlyApartmentUtility, isLoading } = useRentoraApiYearlyApartmentUtility({
    apartmentId: apartmentId!,
  })
  return (
    <Card className="justify-start rounded-2xl">
      <CardHeader>
        <CardTitle className="desktop:flex-row flex flex-col items-center gap-2">
          <ChartColumnBig className="size-5" />
          Apartment's Utility
        </CardTitle>
        <CardDescription> Select a year to view this apartment's monthly utility summary </CardDescription>
      </CardHeader>
      <CardContent className="desktop:space-y-10 space-y-6">
        <MonthlyUtilityApartmentSelect item={yearlyApartmentUtility} isLoading={isLoading} />
      </CardContent>
    </Card>
  )
}

export default OverviewYearlyApartmentUtility
