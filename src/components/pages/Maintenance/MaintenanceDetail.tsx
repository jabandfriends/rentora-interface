import { Calendar, Check, Clock, Mail, MapPin, Phone, Wrench } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common'
import { Badge, EmptyPage, FieldEmpty, LoadingPage } from '@/components/ui'
import { MAINTENANCE_PRIORITY, MAINTENANCE_STATUS } from '@/enum'
import { useRentoraMaintenanceDetail } from '@/hooks'
import { formatDate } from '@/utilities'

import MaintenanceBreadcrumb from './MaintenanceBreadcrumb'

const MaintenanceDetail = () => {
  //param
  const { apartmentId, id } = useParams<{ apartmentId: string; id: string }>()

  //fetch maintenance detail
  const { data: maintenance, isLoading, error } = useRentoraMaintenanceDetail({ apartmentId, maintenanceId: id })

  const [status, setStatus] = useState<string>(MAINTENANCE_STATUS.IN_PROGRESS)

  useEffect(() => {
    if (maintenance?.status) {
      setStatus(maintenance.status)
    }
  }, [maintenance])

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    // In real app, this would make an API call
  }

  if (isLoading) {
    return <LoadingPage />
  }

  if (error) {
    return <EmptyPage title="Maintenance Not Found" description="The maintenance you're looking for doesn't exist. " />
  }

  if (!maintenance) {
    return <EmptyPage title="Maintenance Not Found" description="The maintenance you're looking for doesn't exist." />
  }

  return (
    <div className="space-y-4">
      <MaintenanceBreadcrumb />

      <div className="desktop:flex-row flex flex-col items-start justify-between gap-y-2">
        <div>
          <h2>{maintenance.title}</h2>
          <p className="text-theme-secondary text-body-2">Request ID: {maintenance.ticketNumber}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="warning" className="capitalize">
            {maintenance.status}
          </Badge>
          <Badge variant="default" className="capitalize">
            {maintenance.priority} Priority
          </Badge>
        </div>
      </div>
      <div className="gap-6">
        {/* Main Content */}
        <div className="space-y-6">
          <div className="desktop:grid-cols-3 grid gap-4">
            {/* Description */}
            <Card className="desktop:col-span-2 justify-start rounded-xl shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-theme-secondary">
                  {maintenance.description ? maintenance.description : <FieldEmpty />}
                </p>
              </CardContent>
            </Card>
            {/* Quick Actions */}
            <Card className="rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="capitalize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(MAINTENANCE_STATUS).map((value) => (
                      <SelectItem className="capitalize" value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={maintenance.priority}>
                  <SelectTrigger className="capitalize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(MAINTENANCE_PRIORITY).map((value) => (
                      <SelectItem className="capitalize" value={value}>
                        {value} Priority
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Request Details */}
          <Card className="justify-start rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="size-4" />
                <div>
                  <p className="text-body-2">Created</p>
                  <p className="text-body-2 text-theme-secondary">
                    {maintenance.createdAt ? formatDate(new Date(maintenance.createdAt)) : <FieldEmpty />}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="size-4" />
                <div>
                  <p className="text-body-2">Scheduled</p>
                  <p className="text-body-2 text-theme-secondary">
                    {maintenance.appointmentDate ? formatDate(new Date(maintenance.appointmentDate)) : <FieldEmpty />}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Wrench className="size-4" />
                <div>
                  <p className="text-body-2">Category</p>
                  <p className="text-body-2 text-theme-secondary capitalize">{maintenance.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="size-4" />
                <div>
                  <p className="text-body-2">Estimated Duration</p>
                  <p className="text-body-2 text-theme-secondary">
                    {maintenance.estimatedHours || <FieldEmpty />} hours
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Check className="size-4" />
                <div>
                  <p className="text-body-2">Completed At</p>
                  <p className="text-body-2 text-theme-secondary">
                    {maintenance.completedAt ? (
                      formatDate(new Date(maintenance.completedAt), 'YYYY-MM-DD')
                    ) : (
                      <FieldEmpty />
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tenant Information */}
          <Card className="justify-start rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Tenant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-body-2">{maintenance.tenantName || <FieldEmpty />}</p>
                  <p className="text-body-2 text-theme-secondary">Tenant</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="size-4" />
                <div>
                  <p className="text-body-2">{maintenance.unitName || <FieldEmpty />}</p>
                  <p className="text-body-2 text-theme-secondary">{maintenance.buildingsName || <FieldEmpty />}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="size-4" />
                <p className="text-body-2 text-theme-secondary">{maintenance.tenantPhoneNumber || <FieldEmpty />}</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="size-4" />
                <p className="text-body-2 text-theme-secondary">{maintenance.tenantEmail || <FieldEmpty />}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceDetail
