import { useMemo } from 'react'
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

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

type ITransactionVolumeChartProps = {
  data: Maybe<Array<IPaymentMonthlySummary>>
  isLoading: boolean
}
const TransactionVolumeChart = ({ data, isLoading }: ITransactionVolumeChartProps) => {
  const chartConfig = useMemo(() => {
    return {
      count: {
        label: 'Count',
        color: 'var(--color-theme-primary)',
      },
      totalCost: {
        label: 'Amount',
        color: 'var(--color-theme-secondary)',
      },
    } satisfies ChartConfig
  }, [])

  if (isLoading) return <LoadingPage />
  if (!data || data.length === 0)
    return (
      <EmptyPage
        title="No transaction volume data available"
        description="We couldn't find any transaction volume data for this period. Please check your filters or try again later."
      />
    )

  return (
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
        <XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <ChartLegend />
        <Line
          dataKey="count"
          type="natural"
          strokeWidth={2}
          dot={{
            fill: 'var(--color-theme-primary-800)',
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ChartContainer>
  )
}

export default TransactionVolumeChart
