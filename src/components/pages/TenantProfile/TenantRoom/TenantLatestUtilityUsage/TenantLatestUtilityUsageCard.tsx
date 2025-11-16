import { Calendar, Zap } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Avatar, AvatarFallback } from '@/components/ui'

const TenantLatestUtilityUsageCard = () => {
  return (
    <Card className="border-theme-secondary-300 hover:bg-theme-secondary-100 justify-start space-y-2 rounded-md border shadow-none">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>
              <Zap className="text-theme-warning size-4" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <CardTitle>Electricity</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="text-theme-secondary size-4" /> 10/11/2025
            </CardDescription>
          </div>
        </div>
        <h4>100฿</h4>
      </CardHeader>
      <CardContent>
        <div className="bg-theme-secondary-100 flex items-center justify-between rounded-xl p-4">
          <p className="text-body-2 text-theme-secondary">Usage: 22 units</p>
          <p className="text-body-2 text-theme-secondary">Reading: 870 &rarr; 892</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TenantLatestUtilityUsageCard
