import { Calendar, Clock } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Badge, FieldEmpty, PageTableEmpty } from '@/components/ui'
import type { IMaintenance } from '@/types'
import { formatDate, getDateDiff, timeFromNow } from '@/utilities'

type IOvUpcomingRecurringMaintenanceProps = {
  maintenance: Array<IMaintenance>
}
const OverviewUpcomingRecurringMaintenance = ({ maintenance }: IOvUpcomingRecurringMaintenanceProps) => {
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error'
      case 'medium':
        return 'default'
      default:
        return 'secondary'
    }
  }

  const getDaysUntilColor = (days: number) => {
    if (days <= 2) return 'text-theme-error font-bold'
    if (days <= 7) return 'text-theme-warning font-semibold'
    return 'text-theme-secondary-600'
  }

  if (!maintenance || maintenance.length === 0)
    return (
      <Card className="justify-start rounded-2xl">
        <CardHeader>
          <div className="desktop:flex-row flex flex-col items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="size-5" />
                Upcoming Recurring Maintenance
              </CardTitle>
              <CardDescription>Scheduled maintenance tasks for your units</CardDescription>
            </div>
          </div>
        </CardHeader>
        <PageTableEmpty message="No maintenance requests found" />
      </Card>
    )
  return (
    <Card className="justify-start rounded-2xl">
      <CardHeader>
        <div className="desktop:flex-row flex flex-col items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="size-5" />
              Upcoming Recurring Maintenance
            </CardTitle>
            <CardDescription>Scheduled maintenance tasks for your units</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="desktop:grid-cols-2 grid gap-4">
          {maintenance.map((item, idx) => (
            <div
              key={idx}
              className="hover:bg-theme-secondary-100 border-theme-secondary-300 rounded-lg border p-4 duration-200"
            >
              <div className="mb-2 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant="default">{item.unitName}</Badge>
                    <Badge className="capitalize" variant={getPriorityVariant(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-body-2 text-theme-secondary mt-1">
                    Tenant: {item.tenantName ? item.tenantName : <FieldEmpty />}
                  </p>
                </div>
                <div className="text-right">
                  <div
                    className={`text-body-2 ${getDaysUntilColor(getDateDiff(new Date(), new Date(item.appointmentDate)).days)}`}
                  >
                    {timeFromNow(item.appointmentDate)}
                  </div>
                  <div className="text-theme-secondary text-body-2 mt-1">
                    {formatDate(new Date(item.appointmentDate), 'DD MMM YYYY')}
                  </div>
                </div>
              </div>
              <div className="text-body-2 flex items-center justify-between border-t pt-2">
                <div className="text-theme-secondary flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {item.isRecurring ? 'Recurring' : 'One-time'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default OverviewUpcomingRecurringMaintenance
