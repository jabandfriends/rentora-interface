import { useParams } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

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
import { useRentoraApiMonthlyUtilityBuildings } from '@/hooks/api/queries/useRentoraApiMonthlyUtilityBuilding'
import { type IMonthlyUtilityBuilding, type IUtilityBuildingData } from '@/types'

const MonthlyUtilityBuildingElectChart = ({ utilityGroupName }: IMonthlyUtilityBuilding) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()

  const { data: monthlyUtilityBuilding, isLoading: monthlyUtiltiyBuildingLoading } =
    useRentoraApiMonthlyUtilityBuildings({
      apartmentId: apartmentId!,
    })

  if (monthlyUtiltiyBuildingLoading) {
    return <LoadingPage />
  }

  if (!monthlyUtilityBuilding) {
    return <EmptyPage title="Electric Utility not found" description="No Electric Utility you looking for." />
  }

  const electricUtility: Array<IUtilityBuildingData> = utilityGroupName.electric

  const chartConfig = {
    totalUsageAmount: {
      label: 'Total Usage Amount',
      color: '#3b82f6',
    },
  } satisfies ChartConfig

  return (
    <div>
      <h3> Electric Utility </h3>
      <ChartContainer config={chartConfig} className="h-64 w-64">
        <BarChart accessibilityLayer data={electricUtility}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="totalUsageAmount" fill="#3b82f6" radius={10} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default MonthlyUtilityBuildingElectChart
