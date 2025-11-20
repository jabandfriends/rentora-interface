import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import type { ITenantRoomService } from '@/types'

import TenantRoomServiceCard from './TenantRoomServiceCard'

type ITenantRoomServicesListProps = {
  services: Array<ITenantRoomService>
}
const TenantRoomServices = ({ services }: ITenantRoomServicesListProps) => {
  return (
    <Card className="border-theme-secondary-300 justify-start space-y-2 rounded-xl border shadow">
      <CardHeader>
        <CardTitle>Services</CardTitle>
        <CardDescription>Services will be automatically billed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="desktop:grid-cols-2 grid gap-4">
          {services.map((service: ITenantRoomService) => (
            <TenantRoomServiceCard key={service.id} service={service} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TenantRoomServices
