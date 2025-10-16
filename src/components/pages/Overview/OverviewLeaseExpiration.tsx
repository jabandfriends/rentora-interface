import { FileText } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Badge, PageTableEmpty } from '@/components/ui'
import { ROUTES } from '@/constants'
import { CONTRACT_RENTAL_TYPE } from '@/enum'
import type { IContractSummary } from '@/types'
import { getDateDiff, timeFromNow } from '@/utilities'

type IOverviewLeaseExpirationProps = {
  leaseExpirations: Array<IContractSummary>
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
      case CONTRACT_RENTAL_TYPE.DAILY:
        return <Badge variant="success">Daily</Badge>
      case CONTRACT_RENTAL_TYPE.YEARLY:
        return <Badge variant="error">Yearly</Badge>
      case CONTRACT_RENTAL_TYPE.MONTHLY:
        return <Badge variant="warning">Monthly</Badge>
      default:
        return <Badge variant="default">Unknown</Badge>
    }
  }

  const handleViewAll = useCallback(() => {
    navigate(ROUTES.allRoom.getPath(apartmentId))
  }, [apartmentId, navigate])

  if (!leaseExpirations || leaseExpirations.length === 0)
    return (
      <Card className="justify-start rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            Upcoming Lease Expirations
          </CardTitle>
          <CardDescription>Leases expiring in the next 90 days</CardDescription>
        </CardHeader>
        <PageTableEmpty message="No lease expirations found" />
      </Card>
    )

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
                    <Badge variant="default"> {lease.unitName}</Badge>
                    {getStatusBadge(lease.rentalType)}
                  </div>
                  <p className="text-body-2 font-medium">{lease.tenantName}</p>
                  <p className="text-body-2 text-theme-secondary mt-1">Expires: {lease.endDate}</p>
                </div>
                <div className="text-right">
                  <div className={`text-body-2 ${getDaysUntilColor(getDateDiff(new Date(), lease.endDate).days)}`}>
                    {timeFromNow(lease.endDate)}
                  </div>
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
