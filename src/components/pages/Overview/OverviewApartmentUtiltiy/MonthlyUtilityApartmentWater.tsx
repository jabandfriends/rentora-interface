import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
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
const MonthlyUtilityApartmentWater = ({ item, isLoading }: IApartmentUtilityElect) => {
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

  if (isLoading || !item) {
    return <LoadingPage />
  }

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-start text-lg font-semibold"> Water Utility </h4>
      <ChartContainer config={chartConfig} className="h-80 w-full">
        <BarChart accessibilityLayer data={item.monthlyBreakdown?.water}>
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
          <ChartLegend />
          <Bar dataKey="usageAmount" fill="#3b82f6" radius={10} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default MonthlyUtilityApartmentWater
