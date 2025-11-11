import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Pie, PieChart } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
  EmptyPage,
  LoadingPage,
} from '@/components/ui'
import { MAINTENANCE_CATEGORY } from '@/enum'
import { useRentoraApiMaintenanceAnalyticCategorySummary } from '@/hooks'
import type { IMaintenanceCategorySummary } from '@/types'

const MaintenanceCategorySummaryChart = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: maintenanceCategorySummary, isLoading: isLoadingMaintenanceCategorySummary } =
    useRentoraApiMaintenanceAnalyticCategorySummary({
      apartmentId: apartmentId,
    })

  const chartConfig: ChartConfig = useMemo(() => {
    return {
      [MAINTENANCE_CATEGORY.GENERAL]: {
        label: 'General',
        color: 'var(--color-theme-primary)',
      },
      [MAINTENANCE_CATEGORY.ELECTRICITY]: {
        label: 'Electricity',
        color: 'var(--color-theme-warning)',
      },
      [MAINTENANCE_CATEGORY.PLUMBING]: {
        label: 'Plumbing',
        color: 'var(--color-theme-error)',
      },
    } satisfies ChartConfig
  }, [])
  const dataWithFill: Array<IMaintenanceCategorySummary & { fill: string }> = useMemo(() => {
    return (maintenanceCategorySummary?.map((item: IMaintenanceCategorySummary) => ({
      ...item,
      fill: chartConfig[item.category as MAINTENANCE_CATEGORY].color,
    })) ?? ([] as Array<IMaintenanceCategorySummary & { fill: string }>)) as Array<
      IMaintenanceCategorySummary & { fill: string }
    >
  }, [maintenanceCategorySummary, chartConfig])

  if (isLoadingMaintenanceCategorySummary) return <LoadingPage />
  if (!maintenanceCategorySummary || maintenanceCategorySummary.length === 0)
    return (
      <EmptyPage
        title="No maintenance category summary data available"
        description="We couldn't find any maintenance category summary data for this apartment. Please check your filters or try again later."
      />
    )
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <ChartLegend />
        <Pie data={dataWithFill} dataKey="count" nameKey="category" />
      </PieChart>
    </ChartContainer>
  )
}

export default MaintenanceCategorySummaryChart
