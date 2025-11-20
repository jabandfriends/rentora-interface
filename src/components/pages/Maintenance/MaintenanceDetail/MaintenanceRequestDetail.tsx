import { Calendar, Check, Clock, Wrench } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { FieldEmpty } from '@/components/ui'
import { formatDate } from '@/utilities'

type IMaintenanceRequestDetailProps = {
  createdAt: string
  appointmentDate: string
  category: string
  estimatedHours: number
  completedAt: string
  predictedSchedule: string
  predictedRecurringDate: string
}
const MaintenanceRequestDetail = ({
  createdAt,
  appointmentDate,
  category,
  estimatedHours,
  completedAt,
  predictedSchedule,
  predictedRecurringDate,
}: IMaintenanceRequestDetailProps) => {
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
            <p className="text-body-2 text-theme-secondary">
              {createdAt ? formatDate(new Date(createdAt), 'DD MMM YYYY') : <FieldEmpty />}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="size-4" />
          <div>
            <p className="text-body-2">Scheduled</p>
            <p className="text-body-2 text-theme-secondary">
              {appointmentDate ? formatDate(new Date(appointmentDate), 'DD MMM YYYY') : <FieldEmpty />}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Wrench className="size-4" />
          <div>
            <p className="text-body-2">Category</p>
            <p className="text-body-2 text-theme-secondary capitalize">{category}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="size-4" />
          <div>
            <p className="text-body-2">Estimated Duration</p>
            <p className="text-body-2 text-theme-secondary">{estimatedHours || <FieldEmpty />} hours</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Check className="size-4" />
          <div>
            <p className="text-body-2">Completed At</p>
            <p className="text-body-2 text-theme-secondary">
              {completedAt ? formatDate(new Date(completedAt), 'YYYY-MM-DD') : <FieldEmpty />}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="size-4" />
          <div>
            <p className="text-body-2">Predicted Schedule</p>
            <p className="text-body-2 text-theme-secondary">
              {predictedSchedule ? formatDate(new Date(predictedSchedule), 'DD MMM YYYY') : <FieldEmpty />}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="size-4" />
          <div>
            <p className="text-body-2">Predicted Recurring Date</p>
            <p className="text-body-2 text-theme-secondary">
              {predictedRecurringDate ? formatDate(new Date(predictedRecurringDate), 'DD MMM YYYY') : <FieldEmpty />}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MaintenanceRequestDetail
