import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'

import TenantRoomServiceCard from './TenantRoomServiceCard'

const TenantRoomServices = () => {
  return (
    <Card className="border-theme-secondary-300 justify-start space-y-2 rounded-xl border shadow">
      <CardHeader>
        <CardTitle>Services</CardTitle>
        <CardDescription>Services will be automatically billed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="desktop:grid-cols-2 grid gap-4">
          <TenantRoomServiceCard />
          <TenantRoomServiceCard />
          <TenantRoomServiceCard />
          <TenantRoomServiceCard />
          <TenantRoomServiceCard />
          <TenantRoomServiceCard />
        </div>
      </CardContent>
    </Card>
  )
}

export default TenantRoomServices
