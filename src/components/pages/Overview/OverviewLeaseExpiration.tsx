import { FileText } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Badge } from '@/components/ui'
import { ROUTES } from '@/constants'

type IOverviewLeaseExpirationProps = {
  leaseExpirations: Array<{
    unit: string
    tenant: string
    expiryDate: string
    daysUntil: number
    status: string
  }>
}
const OverviewLeaseExpiration = ({ leaseExpirations }: IOverviewLeaseExpirationProps) => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const navigate: NavigateFunction = useNavigate()
  const getDaysUntilColor = (days: number) => {
    if (days <= 2) return 'text-theme-error font-bold'
    if (days <= 7) return 'text-theme-warning font-semibold'
    return 'text-theme-secondary'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Paid</Badge>
      case 'overdue':
        return <Badge variant="error">Overdue</Badge>
      case 'pending':
        return <Badge variant="warning">Pending</Badge>
      case 'renewing':
        return <Badge variant="default">Renewing</Badge>
      default:
        return <Badge variant="default">Unknown</Badge>
    }
  }

  const handleViewAll = useCallback(() => {
    navigate(ROUTES.allRoom.getPath(apartmentId))
  }, [apartmentId, navigate])
  return (
    <Card className="justify-start rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="size-5" />
          Upcoming Lease Expirations
        </CardTitle>
        <CardDescription>Leases expiring in the next 90 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaseExpirations.map((lease, idx) => (
            <div
              key={idx}
              className="border-theme-secondary-300 hover:bg-theme-secondary-100 rounded-lg border p-3 duration-200"
            >
              <div className="mb-2 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant="default" className="font-mono">
                      Unit {lease.unit}
                    </Badge>
                    {getStatusBadge(lease.status)}
                  </div>
                  <p className="text-body-2 font-medium">{lease.tenant}</p>
                  <p className="text-body-2 text-theme-secondary mt-1">Expires: {lease.expiryDate}</p>
                </div>
                <div className="text-right">
                  <div className={`text-body-2 ${getDaysUntilColor(lease.daysUntil)}`}>{lease.daysUntil} days</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4 w-full" onClick={handleViewAll}>
          Manage Leases
        </Button>
      </CardContent>
    </Card>
  )
}

export default OverviewLeaseExpiration
