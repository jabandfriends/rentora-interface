import { useMemo } from 'react'
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
import { type IMonthlyUtilityBuilding } from '@/types'

type IMonthlyUtilityBuildWater = {
  item: IMonthlyUtilityBuilding
  isLoading: boolean
}
const MonthlyUtilityBuildingWaterChart = ({ item, isLoading }: IMonthlyUtilityBuildWater) => {
  const chartConfig = useMemo(() => {
    return {
      totalUsageAmount: {
        label: 'Total Usage Amount',
        color: '#3b82f6',
      },
    } satisfies ChartConfig
  }, [])

  if (isLoading) {
    return <LoadingPage />
  }

  if (!item) {
    return <EmptyPage title="Water Utility not found" description="No Water Utility you looking for." />
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h4 className="text-start font-semibold"> Water Utility </h4>
        <p className="text-body-2 text-theme-secondary">Water utility</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <BarChart accessibilityLayer data={item.utilityGroupName.water}>
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

export default MonthlyUtilityBuildingWaterChart
