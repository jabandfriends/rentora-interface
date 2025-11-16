import { Card, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Badge } from '@/components/ui'

const TenantRoomServiceCard = () => {
  return (
    <Card className="border-theme-secondary-300 hover:bg-theme-secondary-100 justify-start space-y-2 rounded-md border shadow-none">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>High-Speed WiFi</CardTitle>
          <CardDescription>100 THB</CardDescription>
        </div>
        <Badge variant="outline" className="capitalize">
          Active
        </Badge>
      </CardHeader>
    </Card>
  )
}

export default TenantRoomServiceCard
