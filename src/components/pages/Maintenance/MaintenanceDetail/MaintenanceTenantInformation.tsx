import { Mail, MapPin, Phone } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { FieldEmpty } from '@/components/ui'

type IMaintenanceTenantInformationProps = {
  tenantName: string
  unitName: string
  buildingsName: string
  tenantPhoneNumber: string
  tenantEmail: string
}
const MaintenanceTenantInformation = ({
  tenantName,
  unitName,
  buildingsName,
  tenantPhoneNumber,
  tenantEmail,
}: IMaintenanceTenantInformationProps) => {
  return (
    <Card className="justify-start space-y-2 rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle>Tenant Information</CardTitle>
        <CardDescription>The information of the tenant for this maintenance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-body-2">{tenantName || <FieldEmpty />}</p>
            <p className="text-body-2 text-theme-secondary">Tenant</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="size-4" />
          <div>
            <p className="text-body-2">{unitName || <FieldEmpty />}</p>
            <p className="text-body-2 text-theme-secondary">{buildingsName || <FieldEmpty />}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="size-4" />
          <p className="text-body-2 text-theme-secondary">{tenantPhoneNumber || <FieldEmpty />}</p>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="size-4" />
          <p className="text-body-2 text-theme-secondary">{tenantEmail || <FieldEmpty />}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default MaintenanceTenantInformation
