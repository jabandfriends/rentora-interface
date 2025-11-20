import { Card, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Badge } from '@/components/ui'
import type { ITenantRoomService } from '@/types'
import { formatCurrency } from '@/utilities'

type ITenantRoomServiceCardProps = {
  service: ITenantRoomService
}
const TenantRoomServiceCard = ({ service }: ITenantRoomServiceCardProps) => {
  return (
    <Card className="border-theme-secondary-300 hover:bg-theme-secondary-100 justify-start space-y-2 rounded-md border shadow-none">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>{service.serviceName}</CardTitle>
          <CardDescription>{formatCurrency(service.servicePrice)}</CardDescription>
        </div>
        <Badge variant="outline" className="capitalize">
          {service.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </CardHeader>
    </Card>
  )
}

export default TenantRoomServiceCard
