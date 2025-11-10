import { useDebounce } from '@uidotdev/usehooks'
import { Wrench } from 'lucide-react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/feature'
import { useRentoraApiMaintenanceAnalyticAvailableYears } from '@/hooks'
import { cn } from '@/utilities'

import MaintenanceMonthlyTrendChart from './MaintenanceMonthlyTrendChart'
import MaintenanceSelectYears from './MaintenanceSelectYears'
import MaintenanceYearlyTrendChart from './MaintenanceYearlyTrendChart'

type IMaintenanceTrendProps = {
  className?: string
}
const MaintenanceTrend = ({ className }: IMaintenanceTrendProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: availableYears, isLoading: isLoadingAvailableYears } = useRentoraApiMaintenanceAnalyticAvailableYears({
    apartmentId,
  })
  const { watch, setValue } = useForm({
    defaultValues: {
      year: new Date().getFullYear(),
    },
  })
  const [year]: [number] = watch(['year'])
  const debouncedYear = useDebounce(year ? year : new Date().getFullYear(), 500)

  const handleYearChange = useCallback(
    (value: string) => {
      setValue('year', parseInt(value))
    },
    [setValue],
  )

  return (
    <Card className={cn('justify-start space-y-2 rounded-2xl', className)}>
      <CardHeader className="flex items-center gap-2">
        <Wrench className="bg-theme-primary text-theme-white size-8 rounded-lg p-1" />
        <div>
          <CardTitle>Maintenance Trend</CardTitle>
          <CardDescription>View the maintenance trend for your apartment.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <div className="flex items-center justify-between gap-2">
            <TabsList className="border-theme-secondary-300 border">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
            <MaintenanceSelectYears
              availableYears={availableYears}
              isLoading={isLoadingAvailableYears}
              selectedYear={debouncedYear}
              onYearChange={handleYearChange}
            />
          </div>

          <TabsContent value="monthly">
            <MaintenanceMonthlyTrendChart year={debouncedYear} />
          </TabsContent>
          <TabsContent value="yearly">
            <MaintenanceYearlyTrendChart />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default MaintenanceTrend
