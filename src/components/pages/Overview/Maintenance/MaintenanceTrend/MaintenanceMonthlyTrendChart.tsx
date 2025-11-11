import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
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
import { useRentoraApiMaintenanceAnalyticMaintenanceMonthlyTrend } from '@/hooks'

type IMaintenanceMonthlyTrendChart = {
  year: number
}
const MaintenanceMonthlyTrendChart = ({ year }: IMaintenanceMonthlyTrendChart) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: monthlyTrendData, isLoading: isMonthlyTrendLoading } =
    useRentoraApiMaintenanceAnalyticMaintenanceMonthlyTrend({
      apartmentId: apartmentId,
      params: {
        year: year,
      },
    })
  const chartConfig = useMemo(() => {
    return {
      totalCost: {
        label: 'Total Cost',
        color: 'var(--color-theme-primary)',
      },
      count: {
        label: 'Count',
        color: 'var(--color-theme-warning)',
      },
    } satisfies ChartConfig
  }, [])

  if (isMonthlyTrendLoading) return <LoadingPage />
  if (!monthlyTrendData || monthlyTrendData.length === 0)
    return (
      <EmptyPage
        title="No monthly trend data available"
        description="We couldn't find any monthly trend data for this year. Please check your filters or try again later."
      />
    )
  return (
    <ChartContainer className="h-[250px] w-full" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={monthlyTrendData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="period"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis dataKey="totalCost" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <ChartLegend />
        <Line dataKey="totalCost" type="linear" stroke="var(--color-theme-primary)" strokeWidth={2} />
        <Line dataKey="count" type="linear" stroke="var(--color-theme-warning)" strokeWidth={2} />
      </LineChart>
    </ChartContainer>
  )
}

export default MaintenanceMonthlyTrendChart
