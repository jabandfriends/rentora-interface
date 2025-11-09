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
import type { IApartmentUtility } from '@/types'

type IApartmentUtilityElect = {
  item?: IApartmentUtility
  isLoading: boolean
}
const YearlyUtilityElectChart = ({ item, isLoading }: IApartmentUtilityElect) => {
  if (isLoading) {
    return <LoadingPage />
  }

  if (!item) {
    return <EmptyPage title="Electric Utility not found" description="No Electric Utility you looking for." />
  }

  const chartConfig = {
    totalUsageAmount: {
      label: 'Total Usage Amount',
      color: '#3b82f6',
    },
  } satisfies ChartConfig

  if (isLoading || !item) {
    return <LoadingPage />
  }

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-start text-lg font-semibold"> Electric Utility </h4>
      <ChartContainer config={chartConfig} className="h-80 w-80">
        <BarChart accessibilityLayer data={item.monthlyBreakdown.electric}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="usageAmount" fill="#3b82f6" radius={10} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default YearlyUtilityElectChart
