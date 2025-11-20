import { Calendar, Check, Clock, Wrench } from 'lucide-react'
import { useMemo } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { FieldEmpty } from '@/components/ui'
import type { IMaintenance, Maybe } from '@/types'
import { formatDate } from '@/utilities'

type IMaintenanceRequestDetailProps = {
  maintenance: IMaintenance
}
type IMaintenanceRequestDetail = {
  createdAt: Maybe<string>
  appointmentDate: Maybe<string>
  category: Maybe<string>
  estimatedHours: Maybe<number>
  completedAt: Maybe<string>
  predictedSchedule: Maybe<string>
  predictedRecurringDate: Maybe<string>
}
const MaintenanceRequestDetail = ({ maintenance }: IMaintenanceRequestDetailProps) => {
  // format the data
  const {
    createdAt,
    appointmentDate,
    category,
    estimatedHours,
    completedAt,
    predictedSchedule,
    predictedRecurringDate,
  }: IMaintenanceRequestDetail = useMemo(() => {
    return {
      createdAt: maintenance.createdAt ? formatDate(new Date(maintenance.createdAt), 'DD MMM YYYY') : null,
      appointmentDate: maintenance.appointmentDate
        ? formatDate(new Date(maintenance.appointmentDate), 'DD MMM YYYY')
        : null,
      category: maintenance.category,
      estimatedHours: maintenance.estimatedHours,
      completedAt: maintenance.completedAt ? formatDate(new Date(maintenance.completedAt), 'YYYY-MM-DD') : null,
      predictedSchedule: maintenance.predictedSchedule
        ? formatDate(new Date(maintenance.predictedSchedule), 'DD MMM YYYY')
        : null,
      predictedRecurringDate: maintenance.predictedRecurringDate
        ? formatDate(new Date(maintenance.predictedRecurringDate), 'DD MMM YYYY')
        : null,
    }
  }, [maintenance])

  return (
    <Card className="justify-start space-y-2 rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle>Request Details</CardTitle>
        <CardDescription>The details of the request for this maintenance.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="size-4" />
          <div>
            <p className="text-body-2">Created</p>
            <p className="text-body-2 text-theme-secondary">{createdAt || <FieldEmpty />}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="size-4" />
          <div>
            <p className="text-body-2">Scheduled</p>
            <p className="text-body-2 text-theme-secondary">{appointmentDate || <FieldEmpty />}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Wrench className="size-4" />
          <div>
            <p className="text-body-2">Category</p>
            <p className="text-body-2 text-theme-secondary capitalize">{category || <FieldEmpty />}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="size-4" />
          <div>
            <p className="text-body-2">Estimated Duration</p>
            <p className="text-body-2 text-theme-secondary">
              {estimatedHours ? `${estimatedHours} hours` : <FieldEmpty />}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Check className="size-4" />
          <div>
            <p className="text-body-2">Completed At</p>
            <p className="text-body-2 text-theme-secondary">{completedAt || <FieldEmpty />}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="size-4" />
          <div>
            <p className="text-body-2">Predicted Next Maintenance Date</p>
            <p className="text-body-2 text-theme-secondary">{predictedSchedule || <FieldEmpty />}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="size-4" />
          <div>
            <p className="text-body-2">Next Recurring Schedule Date</p>
            <p className="text-body-2 text-theme-secondary">{predictedRecurringDate || <FieldEmpty />}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MaintenanceRequestDetail
