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

const MonthlyUtilityUnitElectChart = () => {
  const { apartmentId, id: unitId } = useParams<{ apartmentId: string; id: string }>()

  const { data: monthlyUtilityUnit, isLoading: monthlyUtiltiyUnitLoading } = useRentoraApiMonthlyUtilityUnit({
    apartmentId: apartmentId!,
    unitId: unitId!,
  })

  const chartConfig: ChartConfig = useMemo(
    () =>
      ({
        usageAmoung: {
          label: 'Usage Amount',
          color: 'var(--color-theme-primary)',
        },
      }) satisfies ChartConfig,
    [],
  )

  if (monthlyUtiltiyUnitLoading) {
    return <LoadingPage />
  }

  if (!monthlyUtilityUnit) {
    return <EmptyPage title="Electric Utility not found" description="No Electric Utility you looking for." />
  }

  const electricUtility: Array<IUtilityUnitData> = monthlyUtilityUnit.utilityGroupName.electric.map((item) => item)

  return (
    <div>
      <h4> Electric Utility </h4>
      <p className="text-body-2 text-theme-secondary">The electricity usage of the unit.</p>
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <BarChart accessibilityLayer data={electricUtility}>
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
          <Bar radius={10} dataKey="usageAmount" fill="var(--color-theme-primary)" />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default MonthlyUtilityUnitElectChart
