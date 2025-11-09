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
import { PaymentStatus } from '@/enum'
import { useRentoraApiPaymentDistribution } from '@/hooks'
import type { IPaymentDistributionSummary } from '@/types'

const PaymentDistribution = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: paymentDistribution, isLoading: isLoadingPaymentDistribution } = useRentoraApiPaymentDistribution({
    apartmentId,
  })
  const chartConfig = useMemo(() => {
    return {
      [PaymentStatus.PAID]: {
        label: 'Paid',
        color: 'var(--color-theme-success)',
      },
      [PaymentStatus.PARTIALLY_PAID]: {
        label: 'Partially Paid',
        color: 'var(--color-theme-warning)',
      },
      [PaymentStatus.UNPAID]: {
        label: 'Unpaid',
        color: 'var(--color-theme-primary)',
      },
      [PaymentStatus.OVERDUE]: {
        label: 'Overdue',
        color: 'var(--color-theme-error)',
      },
      [PaymentStatus.CANCELLED]: {
        label: 'Cancelled',
        color: 'var(--color-theme-secondary)',
      },
    } satisfies ChartConfig
  }, [])

  const dataWithFill: Array<IPaymentDistributionSummary & { fill: string }> = useMemo(
    () =>
      paymentDistribution?.map((item: IPaymentDistributionSummary) => ({
        ...item,
        fill: chartConfig[item.paymentStatus as PaymentStatus].color,
      })) ?? [],
    [paymentDistribution, chartConfig],
  )
  if (isLoadingPaymentDistribution) return <LoadingPage />
  if (!paymentDistribution || paymentDistribution.length === 0)
    return (
      <EmptyPage
        title="No payment distribution data available"
        description="We couldn't find any payment distribution data for this period. Please check your filters or try again later."
      />
    )

  return (
    <ChartContainer className="mx-auto max-h-[250px]" config={chartConfig}>
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <ChartLegend />
        <Pie data={dataWithFill} dataKey="totalPayment" nameKey="paymentStatus" />
      </PieChart>
    </ChartContainer>
  )
}

export default PaymentDistribution
