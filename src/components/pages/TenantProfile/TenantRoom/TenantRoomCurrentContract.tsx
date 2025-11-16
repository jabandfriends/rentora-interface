import { Calendar, FileText } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Badge, Progress, Separator } from '@/components/ui'

const TenantRoomCurrentContract = () => {
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
          <Calendar className="text-theme-primary size-4" /> Monthly
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div>
            <h5 className="text-body-2 fond-medium">Start Date</h5>
            <p className="text-body-2 text-theme-secondary">10/11/2025</p>
          </div>
          <div>
            <h5 className="text-body-2 fond-medium">End Date</h5>
            <p className="text-body-2 text-theme-secondary">10/11/2025</p>
          </div>

          <div>
            <h5 className="text-body-2 fond-medium">Days remaining</h5>
            <p className="text-body-2 text-theme-secondary">10 days</p>
          </div>
          <Progress value={10} />
        </div>

        <Separator />
        <div className="desktop:grid-cols-2 grid gap-4">
          <div>
            <h5 className="text-body-2 fond-medium">Rental Price</h5>
            <p className="text-body-2 text-theme-secondary">100,000 THB</p>
          </div>
          <div>
            <h5 className="text-body-2 fond-medium">Deposit Amount</h5>
            <p className="text-body-2 text-theme-secondary">100,000 THB</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TenantRoomCurrentContract
