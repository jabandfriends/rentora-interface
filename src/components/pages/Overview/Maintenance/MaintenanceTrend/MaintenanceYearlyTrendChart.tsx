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
import { useRentoraApiMaintenanceYearlySummaryTrend } from '@/hooks'

const MaintenanceYearlyTrendChart = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: yearlyTrendData, isLoading: isYearlyTrendLoading } = useRentoraApiMaintenanceYearlySummaryTrend({
    apartmentId: apartmentId,
  })
  const chartConfig = useMemo(() => {
    return {
      totalCost: {
        label: 'Year',
        color: 'var(--color-theme-primary)',
      },
      count: {
        label: 'Count',
        color: 'var(--color-theme-warning)',
      },
    } satisfies ChartConfig
  }, [])

  if (isYearlyTrendLoading) return <LoadingPage />
  if (!yearlyTrendData || yearlyTrendData.length === 0)
    return (
      <EmptyPage
        title="No yearly trend data available"
        description="We couldn't find any yearly trend data for this year. Please check your filters or try again later."
      />
    )
  return (
    <ChartContainer className="h-[250px] w-full" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={yearlyTrendData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="period" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis dataKey="totalCost" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartLegend />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line dataKey="totalCost" type="linear" stroke="var(--color-theme-primary)" strokeWidth={2} />
        <Line dataKey="count" type="linear" stroke="var(--color-theme-warning)" strokeWidth={2} />
      </LineChart>
    </ChartContainer>
  )
}

export default MaintenanceYearlyTrendChart
