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

type IMonthlyUtilityBuildElect = {
  item: IMonthlyUtilityBuilding
  isLoading: boolean
}

const MonthlyUtilityBuildingElectChart = ({ item, isLoading }: IMonthlyUtilityBuildElect) => {
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
    return <EmptyPage title="Electric Utility not found" description="No Electric Utility you looking for." />
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h4 className="font-semibold"> Electric Utility </h4>
        <p className="text-theme-secondary text-body-2">Electric Utiltiy</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <BarChart accessibilityLayer data={item.utilityGroupName.electric}>
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

export default MonthlyUtilityBuildingElectChart
