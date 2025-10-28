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

const MonthlyUtilityUnitElect = () => {
  const { apartmentId, id } = useParams<{ apartmentId: string; id: string }>()

  const { data: monthlyUtilityUnit, isLoading } = useRentoraApiMonthlyUtilityUnit({ apartmentId, unitId: id })

  if (isLoading) {
    return <LoadingPage />
  }

  if (!monthlyUtilityUnit) {
    return <EmptyPage title="Data Error" description="Cannot load utility data." />
  }

  const waterUtility = monthlyUtilityUnit.utilityGroupName.water.map((item) => ({
    month: item.month,
    usageAmount: parseFloat(item.usageAmount.toFixed(2)),
  }))

  const chartConfig = {
    usageAmoung: {
      label: 'Usage Amount',
      color: '48 96.6% 76.7%',
    },
  } satisfies ChartConfig

  return (
    <div>
      <h3> Water Utility </h3>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={waterUtility}>
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
          <Bar dataKey="usageAmount" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default MonthlyUtilityUnitElect
