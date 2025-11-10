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
import type { IYearlyApartmentUtility } from '@/types'

type IYearlyUtilityWater = {
  item?: Array<IYearlyApartmentUtility>
  isLoading: boolean
}
const YearlyUtilityWaterChart = ({ item, isLoading }: IYearlyUtilityWater) => {
  const chartConfig = useMemo(() => {
    return {
      totalUsageAmount: {
        label: 'Water Usage Amount',
        color: '#3b82f6',
      },
    } satisfies ChartConfig
  }, [])

  const yearlySummary = item?.[0]

  const chartData = useMemo(
    () => [
      {
        year: yearlySummary?.year,
        waterUsage: yearlySummary?.usageTotals.water,
      },
    ],
    [yearlySummary],
  )

  if (isLoading) {
    return <LoadingPage />
  }

  if (!item) {
    return <EmptyPage title="Water Utility not found" description="No Water Utility you looking for." />
  }

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-start font-semibold"> Water Utility </h4>
      <ChartContainer config={chartConfig} className="h-80 w-80">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="year"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => String(value).slice(0, 4)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="waterUsage" fill="#3b82f6" radius={10} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default YearlyUtilityWaterChart
