import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  EmptyPage,
  LoadingPage,
} from '@/components/ui'
import { useRentoraApiMonthlyUtilityUnit } from '@/hooks'
import { type IUtilityUnitData } from '@/types'

const MonthlyUtilityUnitWaterChart = () => {
  const { apartmentId, id: unitId } = useParams<{ apartmentId: string; id: string }>()

  const { data: monthlyUtilityUnit, isLoading: monthlyUtiltiyUnitLoading } = useRentoraApiMonthlyUtilityUnit({
    apartmentId: apartmentId!,
    unitId: unitId!,
  })

  const chartConfig = useMemo(() => {
    return {
      usageAmoung: {
        label: 'Usage Amount',
        color: 'var(--color-theme-primary)',
      },
    } satisfies ChartConfig
  }, [])

  if (monthlyUtiltiyUnitLoading) {
    return <LoadingPage />
  }

  if (!monthlyUtilityUnit) {
    return <EmptyPage title="Water Utility not found" description="No Water Utility you looking for." />
  }
  const waterUtility: Array<IUtilityUnitData> = monthlyUtilityUnit?.utilityGroupName.water || []

  return (
    <div>
      <h4> Water Utility </h4>
      <p className="text-body-2 text-theme-secondary">The water usage of the unit.</p>
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <BarChart accessibilityLayer data={waterUtility}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis dataKey="usageAmount" tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="usageAmount" fill="var(--color-theme-primary)" radius={10} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default MonthlyUtilityUnitWaterChart
