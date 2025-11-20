import { Calendar, FileText } from 'lucide-react'
import { useMemo } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Badge, Progress, Separator } from '@/components/ui'
import type { DateDiff, ITenantCurrentContract } from '@/types'
import { formatCurrency, formatDate, getDateDiff } from '@/utilities'

type ITenantRoomCurrentContractProps = {
  currentContract: ITenantCurrentContract
}
const TenantRoomCurrentContract = ({ currentContract }: ITenantRoomCurrentContractProps) => {
  const progressValue: number = useMemo(() => {
    const today: Date = new Date()
    const { days: elapsedDays }: DateDiff = getDateDiff(currentContract.startDate, today)
    const { days: totalDays }: DateDiff = getDateDiff(currentContract.startDate, currentContract.endDate)
    return Math.round((elapsedDays / totalDays) * 100)
  }, [currentContract])

  return (
    <Card className="border-theme-secondary-300 justify-start space-y-2 rounded-xl border shadow">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <FileText className="text-theme-primary size-4" /> Current Contract
          </CardTitle>
          <CardDescription>Active contract for this room</CardDescription>
        </div>
        <Badge variant="outline" className="capitalize">
          <Calendar className="text-theme-primary size-4" /> {currentContract.rentalType}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div>
            <h5 className="text-body-2 fond-medium">Start Date</h5>
            <p className="text-body-2 text-theme-secondary">
              {formatDate(new Date(currentContract.startDate), 'DD-MM-YYYY')}
            </p>
          </div>
          <div>
            <h5 className="text-body-2 fond-medium">End Date</h5>
            <p className="text-body-2 text-theme-secondary">
              {formatDate(new Date(currentContract.endDate), 'DD-MM-YYYY')}
            </p>
          </div>

          <div>
            <h5 className="text-body-2 fond-medium">Days remaining</h5>
            <p className="text-body-2 text-theme-secondary">{currentContract.daysRemaining} days</p>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-body-2 font-semibold">Contract Progress</p>
              <p className="text-body-2 text-theme-secondary">{progressValue}%</p>
            </div>
            <Progress value={progressValue} />
          </div>
        </div>

        <Separator />
        <div className="desktop:grid-cols-2 grid gap-4">
          <div>
            <h5 className="text-body-2 fond-medium">Rental Price</h5>
            <p className="text-body-2 text-theme-secondary">{formatCurrency(currentContract.rentalPrice)}</p>
          </div>
          <div>
            <h5 className="text-body-2 fond-medium">Deposit Amount</h5>
            <p className="text-body-2 text-theme-secondary">{formatCurrency(currentContract.depositAmount)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TenantRoomCurrentContract
