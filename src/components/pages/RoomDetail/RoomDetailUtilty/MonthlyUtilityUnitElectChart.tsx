import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

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

const MonthlyUtilityUnitElectChart = () => {
  const { apartmentId, id: unitId } = useParams<{ apartmentId: string; id: string }>()

  const { data: monthlyUtilityUnit, isLoading: monthlyUtiltiyUnitLoading } = useRentoraApiMonthlyUtilityUnit({
    apartmentId: apartmentId!,
    unitId: unitId!,
  })

  const chartConfig = useMemo(() => {
    return {
      usageAmoung: {
        label: 'Usage Amount',
        color: '#3b82f6',
      },
    } satisfies ChartConfig
  }, [])

  const electricUtility: Array<IUtilityUnitData> = useMemo(
    () => monthlyUtilityUnit?.utilityGroupName.electric || [],
    [monthlyUtilityUnit],
  )

  if (monthlyUtiltiyUnitLoading) {
    return <LoadingPage />
  }

  if (!monthlyUtilityUnit) {
    return <EmptyPage title="Electric Utility not found" description="No Electric Utility you looking for." />
  }

  return (
    <div>
      <h3> Electric Utility </h3>
      <ChartContainer config={chartConfig} className="h-64 w-64">
        <BarChart accessibilityLayer data={electricUtility}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="usageAmount" fill="#3b82f6" radius={10} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default MonthlyUtilityUnitElectChart
