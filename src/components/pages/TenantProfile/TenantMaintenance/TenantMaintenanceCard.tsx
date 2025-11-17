import { Calendar, MapPin } from 'lucide-react'
import type { VariantProps } from 'tailwind-variants'

import { Card, CardContent, CardDescription, CardTitle } from '@/components/common'
import { Badge } from '@/components/ui'
import type { IMaintenanceInfo } from '@/types'
import { formatDate } from '@/utilities'

type ITenantMaintenanceCardProps = {
  maintenance: IMaintenanceInfo
  statusBadgeVariant: (status: string) => VariantProps<typeof Badge>['variant']
  priorityBadgeVariant: (priority: string) => VariantProps<typeof Badge>['variant']
}

const TenantMaintenanceCard = ({
  maintenance,
  statusBadgeVariant,
  priorityBadgeVariant,
}: ITenantMaintenanceCardProps) => {
  return (
    <Card className="border-theme-secondary-300 rounded-xl border shadow-none hover:shadow">
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle>{maintenance.title}</CardTitle>
            <CardDescription>Ticket: {maintenance.ticketNumber}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={statusBadgeVariant(maintenance.status)} className="capitalize">
              {maintenance.status}
            </Badge>
            <Badge variant={priorityBadgeVariant(maintenance.priority)} className="capitalize">
              {maintenance.priority}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-theme-secondary flex items-center gap-2">
            <MapPin size={16} />
            <span className="text-body-2">
              {maintenance.unitName} - {maintenance.buildingsName}
            </span>
          </div>
          <div className="text-theme-secondary flex items-center gap-2">
            <Calendar size={16} />
            <span className="text-body-2">
              Created: {maintenance.createdAt ? formatDate(new Date(maintenance.createdAt), 'DD/MM/YYYY') : 'N/A'}
            </span>
          </div>
        </div>

        {maintenance.appointmentDate && (
          <div className="text-theme-secondary text-body-2">
            Appointment: {formatDate(new Date(maintenance.appointmentDate), 'DD/MM/YYYY')}
          </div>
        )}

        {maintenance.dueDate && (
          <div className="text-theme-secondary text-body-2">
            Due Date: {formatDate(new Date(maintenance.dueDate), 'DD/MM/YYYY')}
          </div>
        )}

        {maintenance.actualCost > 0 && (
          <div className="text-theme-secondary text-body-2">Cost: {maintenance.actualCost.toFixed(2)} THB</div>
        )}

        {maintenance.isRecurring && (
          <Badge variant="success" className="w-fit">
            Recurring: {maintenance.recurringSchedule || 'N/A'}
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}

export default TenantMaintenanceCard
