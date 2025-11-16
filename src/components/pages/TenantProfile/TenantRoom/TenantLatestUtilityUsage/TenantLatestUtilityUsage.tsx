import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import type { ITenantContractUtilityUsage } from '@/types'

import TenantLatestUtilityUsageCard from './TenantLatestUtilityUsageCard'

type ITenantLatestUtilityUsageProps = {
  utilityUsages: Array<ITenantContractUtilityUsage>
}
const TenantLatestUtilityUsage = ({ utilityUsages }: ITenantLatestUtilityUsageProps) => {
  return (
    <Card className="border-theme-secondary-300 justify-start space-y-2 rounded-xl border shadow">
      <CardHeader>
        <CardTitle>Latest Utility Usage</CardTitle>
        <CardDescription>View the latest utility usage for your apartment.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="desktop:grid-cols-2 grid gap-4">
          {utilityUsages.map((utilityUsage: ITenantContractUtilityUsage, index: number) => (
            <TenantLatestUtilityUsageCard
              key={`${utilityUsage.utilityType}-${utilityUsage.readingDate}-${index}`}
              utilityUsage={utilityUsage}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TenantLatestUtilityUsage
