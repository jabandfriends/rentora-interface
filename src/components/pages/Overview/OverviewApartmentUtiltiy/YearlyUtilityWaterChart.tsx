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
import type { IYearlyApartmentUtility } from '@/types/hooks/api/query/apartment-utility'

type IYearlyUtilityWater = {
  item: IYearlyApartmentUtility
  isLoading: boolean
}
const YearlyUtilityWaterChart = ({ item, isLoading }: IYearlyUtilityWater) => {
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

  const chartData = [
    {
      month: item.year.toString(),
      usageAmount: item.usageTotals.water,
    },
  ]

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-start text-lg font-semibold"> Water Utility </h4>
      <ChartContainer config={chartConfig} className="h-80 w-80">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis dataKey="totalUsageAmount" tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="totalUsageAmount" fill="#3b82f6" radius={10} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default YearlyUtilityWaterChart
