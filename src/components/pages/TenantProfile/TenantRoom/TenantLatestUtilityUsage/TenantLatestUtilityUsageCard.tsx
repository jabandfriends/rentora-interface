import { Calendar, Droplet, Zap } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Avatar, AvatarFallback } from '@/components/ui'
import type { ITenantContractUtilityUsage } from '@/types'
import { formatCurrency, formatDate } from '@/utilities'

type ITenantLatestUtilityUsageCardProps = {
  utilityUsage: ITenantContractUtilityUsage
}
const TenantLatestUtilityUsageCard = ({ utilityUsage }: ITenantLatestUtilityUsageCardProps) => {
  return (
    <Card className="border-theme-secondary-300 hover:bg-theme-secondary-100 justify-start space-y-2 rounded-md border shadow-none">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>
              {utilityUsage.utilityType === 'electric' ? (
                <Zap className="text-theme-warning size-4" />
              ) : (
                <Droplet className="text-theme-primary size-4" />
              )}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <CardTitle className="capitalize">{utilityUsage.utilityType}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Calendar className="text-theme-secondary size-4" />{' '}
              {formatDate(new Date(utilityUsage.readingDate), 'DD/MM/YYYY')}
            </CardDescription>
          </div>
        </div>
        <h4>{formatCurrency(utilityUsage.totalCost)}</h4>
      </CardHeader>
      <CardContent>
        <div className="bg-theme-secondary-100 flex items-center justify-between rounded-xl p-4">
          <p className="text-body-2 text-theme-secondary">Usage: {utilityUsage.totalUsage} units</p>
          <p className="text-body-2 text-theme-secondary">
            Reading: {utilityUsage.beforeReading} &rarr; {utilityUsage.afterReading}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TenantLatestUtilityUsageCard
