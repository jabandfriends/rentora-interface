import { CheckCircle, Clock, DollarSign, XCircle } from 'lucide-react'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Badge } from '@/components/ui'

const OverviewPaymentStatus = ({ paymentStatus }: { paymentStatus: any }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Paid</Badge>
      case 'overdue':
        return <Badge variant="error">Overdue</Badge>
      case 'pending':
        return <Badge variant="warning">Pending</Badge>
      case 'renewing':
        return <Badge className="default">Renewing</Badge>
      case 'in-progress':
        return <Badge className="default">In Progress</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }
  return (
    <Card className="justify-start rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="size-5" />
          Recent Payment Status
        </CardTitle>
        <CardDescription>Overview of rent payments for this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {paymentStatus.map((payment: any, idx: number) => (
            <div
              key={idx}
              className="hover:bg-theme-secondary-100 border-theme-secondary-300 rounded-lg border p-4 duration-200"
            >
              <div className="desktop:flex-row desktop:items-center flex flex-col justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-1 ${payment.status === 'paid' ? 'bg-theme-success-400' : payment.status === 'overdue' ? 'bg-theme-error-400' : 'bg-theme-secondary-400'}`}
                  >
                    {payment.status === 'paid' ? (
                      <CheckCircle size={20} className="text-theme-white" />
                    ) : payment.status === 'overdue' ? (
                      <XCircle size={20} className="text-theme-white" />
                    ) : (
                      <Clock size={20} className="text-theme-white" />
                    )}
                  </div>
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <Badge variant="default" className="font-mono">
                        Unit {payment.unit}
                      </Badge>
                      {getStatusBadge(payment.status)}
                    </div>
                    <p className="text-body-1 font-medium">{payment.tenant}</p>
                    <p className="text-body-2">
                      {payment.status === 'paid'
                        ? `Paid on ${payment.date}`
                        : payment.status === 'overdue'
                          ? `${payment.daysOverdue} days overdue`
                          : `Due: ${payment.dueDate}`}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">${payment.amount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 w-full">
          View All Payments
        </Button>
      </CardContent>
    </Card>
  )
}

export default OverviewPaymentStatus
