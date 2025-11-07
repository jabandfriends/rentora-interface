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
import type { IMonthtlyUtilityFloor } from '@/types'

type IMonthlyUtilityFloorElectChart = {
  item: IMonthtlyUtilityFloor
  isLoading: boolean
}

const MonthlyUitlityFloorWaterChart = ({ item, isLoading }: IMonthlyUtilityFloorElectChart) => {
  if (isLoading) {
    return <LoadingPage />
  }

  if (!item) {
    return <EmptyPage title="Water Utility not found" description="No Water Utility you looking for." />
  }

  const chartConfig = {
    totalUsageAmount: {
      label: 'Total Usage Amount',
      color: '#3b82f6',
    },
  } satisfies ChartConfig

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-lg font-semibold"> Water Utility </h4>
      <ChartContainer config={chartConfig} className="h-80 w-80">
        <BarChart accessibilityLayer data={item.utilityGroupName.water}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis dataKey="totalFloorUsage" tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="totalFloorUsage" fill="#3b82f6" radius={10} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default MonthlyUitlityFloorWaterChart
