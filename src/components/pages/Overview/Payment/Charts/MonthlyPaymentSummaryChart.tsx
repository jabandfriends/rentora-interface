import { useMemo } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  EmptyPage,
  LoadingPage,
} from '@/components/ui'
import type { IPaymentMonthlySummary, Maybe } from '@/types'

type IMonthlyPaymentSummaryChartProps = {
  data: Maybe<Array<IPaymentMonthlySummary>>
  isDataLoading: boolean
}
const MonthlyPaymentSummaryChart = ({ data, isDataLoading }: IMonthlyPaymentSummaryChartProps) => {
  const chartConfig = useMemo(() => {
    return {
      totalCost: {
        label: 'Amount',
        color: 'var(--color-theme-secondary)',
      },
    } satisfies ChartConfig
  }, [])

  const isLoading: boolean = useMemo(() => isDataLoading, [isDataLoading])
  if (isLoading) return <LoadingPage />
  if (!data || data.length === 0)
    return (
      <EmptyPage
        title="No monthly payment summary data available"
        description="We couldn't find any monthly payment summary data for this period. Please check your filters or try again later."
      />
    )
  return (
    <div className="space-y-4">
      <ChartContainer className="h-[250px] w-full" config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <YAxis dataKey="totalCost" />
          <XAxis dataKey="period" tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <ChartLegend />
          <Line dataKey="totalCost" type="natural" stroke="var(--color-theme-primary)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}

export default MonthlyPaymentSummaryChart
