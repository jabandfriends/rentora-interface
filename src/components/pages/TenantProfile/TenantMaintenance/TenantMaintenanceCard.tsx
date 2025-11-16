import { Box, Calendar, Clock } from 'lucide-react'

import { Button, Card, CardContent, CardDescription, CardTitle } from '@/components/common'
import { Badge } from '@/components/ui'

const TenantMaintenanceCard = () => {
  return (
    <Card className="border-theme-secondary-300 rounded-xl border shadow-none hover:shadow">
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Leaking Faucet in kitchen</CardTitle>
            <CardDescription>The faucet in the kitchen is leaking. Please fix it as soon as possible.</CardDescription>
          </div>
          <div className="space-x-2">
            <Badge variant="warning" className="capitalize">
              <Clock size={16} /> In Progress
            </Badge>
            <Badge variant="outline" className="capitalize">
              Medium
            </Badge>
          </div>
        </div>

        {/* category */}
        <div className="flex items-center gap-2">
          <div className="text-theme-secondary flex items-center gap-2">
            <Box size={16} /> <span className="text-body-2 capitalize">Plumbing</span>
          </div>
          <div className="text-theme-secondary flex items-center gap-2">
            <Calendar size={16} /> <span className="text-body-2">Created : 10/11/2025</span>
          </div>
        </div>
        <Button variant="outline">View Details</Button>
      </CardContent>
    </Card>
  )
}

export default TenantMaintenanceCard
