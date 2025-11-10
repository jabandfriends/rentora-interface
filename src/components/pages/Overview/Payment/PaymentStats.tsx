import { CircleAlert, CircleCheckBig, Clock, DollarSign, TrendingUp } from 'lucide-react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { StatsCard } from '@/components/ui'
import { useRentoraApiPaymentStatsSummary } from '@/hooks'
import { formatCurrency } from '@/utilities'

const PaymentStats = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const { data: paymentStats, isLoading: isLoadingPaymentStats } = useRentoraApiPaymentStatsSummary({
    apartmentId,
  })

  const { totalRental, totalPaid, totalPending, totalOverdue } = useMemo(() => {
    return {
      totalRental: formatCurrency(paymentStats?.totalRental ?? 0),
      totalPaid: formatCurrency(paymentStats?.totalPaid ?? 0),
      totalPending: formatCurrency(paymentStats?.totalPending ?? 0),
      totalOverdue: formatCurrency(paymentStats?.totalOverdue ?? 0),
    }
  }, [paymentStats])

  return (
    <Card className="space-y-4 rounded-2xl">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="bg-theme-primary text-theme-white size-8 rounded-md p-1" />
          <div>
            <CardTitle>Payment Stats</CardTitle>
            <CardDescription>View statistics and filter through all payment records</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        <StatsCard
          title="Total Rental Amount"
          isLoading={isLoadingPaymentStats}
          count={totalRental}
          icon={<DollarSign size={22} />}
          type="primary"
        />
        <StatsCard
          title="Amount Paid"
          isLoading={isLoadingPaymentStats}
          count={totalPaid}
          icon={<CircleCheckBig size={22} />}
          type="success"
        />
        <StatsCard
          title="Amount Pending"
          isLoading={isLoadingPaymentStats}
          count={totalPending}
          icon={<Clock size={22} />}
          type="warning"
        />
        <StatsCard
          title="Overdue Amount"
          isLoading={isLoadingPaymentStats}
          count={totalOverdue}
          icon={<CircleAlert size={22} />}
          type="error"
        />
      </CardContent>
    </Card>
  )
}

export default PaymentStats
