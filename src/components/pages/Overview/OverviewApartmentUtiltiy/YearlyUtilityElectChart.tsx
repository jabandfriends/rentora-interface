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
import type { IYearlyApartmentUtility } from '@/types/hooks/api/query/apartment-utility'

type IYearlyUtilityElect = {
  item?: Array<IYearlyApartmentUtility>
  isLoading: boolean
}
const YearlyUtilityElectChart = ({ item, isLoading }: IYearlyUtilityElect) => {
  const chartConfig = useMemo(() => {
    return {
      totalUsageAmount: {
        label: 'Total Usage Amount',
        color: '#3b82f6',
      },
    } satisfies ChartConfig
  }, [])

  const yearlySummary = item?.[0]

  const chartData = useMemo(
    () => [
      {
        year: yearlySummary?.year,
        electricUsage: yearlySummary?.usageTotals.electric,
      },
    ],
    [yearlySummary],
  )

  if (!item) {
    return <EmptyPage title="Electric Utility not found" description="No Electric Utility you looking for." />
  }

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-start font-semibold"> Electric Utility </h4>
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
          <Bar dataKey="electricUsage" fill="#3b82f6" radius={10} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default YearlyUtilityElectChart
