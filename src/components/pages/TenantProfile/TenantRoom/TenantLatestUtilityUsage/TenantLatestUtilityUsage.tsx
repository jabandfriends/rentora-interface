import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Separator } from '@/components/ui'

import TenantLatestUtilityUsageCard from './TenantLatestUtilityUsageCard'

const TenantLatestUtilityUsage = () => {
  return (
    <Card className="border-theme-secondary-300 justify-start space-y-2 rounded-xl border shadow">
      <CardHeader>
        <CardTitle>Latest Utility Usage</CardTitle>
        <CardDescription>View the latest utility usage for your apartment.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <TenantLatestUtilityUsageCard />
          <Separator />
          <TenantLatestUtilityUsageCard />
        </div>
      </CardContent>
    </Card>
  )
}

export default TenantLatestUtilityUsage
