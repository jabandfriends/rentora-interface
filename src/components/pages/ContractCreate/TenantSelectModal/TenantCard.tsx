import { Mail, Phone } from 'lucide-react'
import { useCallback } from 'react'

import { FieldEmpty } from '@/components/ui'
import type { ITenant } from '@/types'
import { cn } from '@/utilities'

type ITenantCard = {
  tenant: ITenant
  onSelectTenant: (userId: string, name: string) => void
  selectedTenantId?: string
}
const TenantCard = ({ tenant, onSelectTenant, selectedTenantId }: ITenantCard) => {
  const handleSelectTenant = useCallback(() => {
    onSelectTenant(tenant.userId, tenant.fullName)
  }, [onSelectTenant, tenant.userId, tenant.fullName])
  return (
    <div
      key={tenant.userId}
      onClick={handleSelectTenant}
      className={cn(
        'border-theme-secondary-300 hover:bg-theme-primary-100 hover:border-theme-primary-300 space-y-2 rounded-lg border px-4 py-3 duration-200',
        [
          selectedTenantId === tenant.userId &&
          'bg-theme-primary-100/80 text-theme-primary-600 border-theme-primary-300',
        ],
      )}
    >
      <h4 className="text-theme-secondary-600">{tenant.fullName}</h4>
      <div>
        <p className="text-body-2 flex items-center gap-x-2">
          <Mail className="size-4" />
          {tenant.email}
        </p>
        <p className="text-body-2 flex items-center gap-x-2">
          <Phone className="size-4" />
          {tenant.phoneNumber || <FieldEmpty />}
        </p>
      </div>
    </div>
  )
}

export default TenantCard
