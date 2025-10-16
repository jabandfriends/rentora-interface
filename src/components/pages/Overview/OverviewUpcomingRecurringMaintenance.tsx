import { Calendar, Clock } from 'lucide-react'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { Badge } from '@/components/ui'

type IOvUpcomingRecurringMaintenanceProps = {
  maintenance: Array<{
    unit: string
    type: string
    tenant: string
    priority: string
    daysUntil: number
    dueDate: string
    lastCompleted: string
    recurring: string
  }>
  handleFilterPriority: (priority: string) => void
}
const OverviewUpcomingRecurringMaintenance = ({
  maintenance,
  handleFilterPriority,
}: IOvUpcomingRecurringMaintenanceProps) => {
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
          <div className="flex gap-2">
            <Button size="sm" onClick={() => handleFilterPriority('all')}>
              All
            </Button>
            <Button size="sm" onClick={() => handleFilterPriority('high')}>
              High
            </Button>
            <Button size="sm" onClick={() => handleFilterPriority('medium')}>
              Medium
            </Button>
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
                    <Badge variant="default" className="font-mono">
                      Unit {item.unit}
                    </Badge>
                    <Badge className="capitalize" variant={getPriorityVariant(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                  <h4 className="font-semibold">{item.type}</h4>
                  <p className="text-body-2 text-theme-secondary mt-1">Tenant: {item.tenant}</p>
                </div>
                <div className="text-right">
                  <div className={`text-body-2 ${getDaysUntilColor(item.daysUntil)}`}>
                    {item.daysUntil === 1 ? 'Tomorrow' : `${item.daysUntil} days`}
                  </div>
                  <div className="text-theme-secondary text-body-2 mt-1">{item.dueDate}</div>
                </div>
              </div>
              <div className="text-body-2 flex items-center justify-between border-t pt-2">
                <div className="text-theme-secondary flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {item.recurring}
                  </span>
                  <span className="text-body-2">Last: {item.lastCompleted}</span>
                </div>
                <Button size="sm" variant="outline">
                  Schedule
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default OverviewUpcomingRecurringMaintenance
