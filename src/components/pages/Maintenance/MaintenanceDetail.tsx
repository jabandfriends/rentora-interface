import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Edit3,
  Mail,
  MapPin,
  Phone,
  Save,
  Wrench,
  X,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/common'
import { Avatar, AvatarFallback, AvatarImage, Badge } from '@/components/ui'

const MaintenanceDetail = () => {
  const [status, setStatus] = useState<string>('in-progress')
  const [priority, setPriority] = useState<string>('medium')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedDescription, setEditedDescription] = useState(
    'The kitchen faucet has been leaking for the past week. Water drips constantly from the base of the faucet, causing water waste and potential damage to the cabinet below. The leak appears to be coming from the connection between the faucet and the sink.',
  )

  // Mock data
  const maintenanceRequest = {
    id: 'MNT-2024-001',
    title: 'Kitchen Faucet Leak',
    description:
      'The kitchen faucet has been leaking for the past week. Water drips constantly from the base of the faucet, causing water waste and potential damage to the cabinet below. The leak appears to be coming from the connection between the faucet and the sink.',
    status: 'in-progress',
    priority: 'medium',
    category: 'Plumbing',
    createdAt: '2024-03-15T10:30:00Z',
    updatedAt: '2024-03-16T14:20:00Z',
    scheduledDate: '2024-03-18T09:00:00Z',
    estimatedDuration: '2 hours',
    apartment: {
      unit: '4B',
      address: '123 Oak Street, Building A',
      tenant: {
        name: 'Sarah Johnson',
        phone: '+1 (555) 123-4567',
        email: 'sarah.johnson@email.com',
        avatar: undefined,
      },
    },
    assignedTo: {
      id: 'john-doe',
      name: 'John Doe',
      role: 'Maintenance Technician',
      phone: '+1 (555) 987-6543',
      avatar: undefined,
    },
    attachments: [
      { id: 1, name: 'kitchen_leak_photo1.jpg', type: 'image', size: '2.4 MB' },
      { id: 2, name: 'kitchen_leak_photo2.jpg', type: 'image', size: '1.8 MB' },
    ],
  }

  const statusConfig = {
    open: { color: 'bg-blue-500', label: 'Open', icon: AlertTriangle },
    'in-progress': { color: 'bg-yellow-500', label: 'In Progress', icon: Clock },
    completed: { color: 'bg-green-500', label: 'Completed', icon: CheckCircle },
    cancelled: { color: 'bg-red-500', label: 'Cancelled', icon: XCircle },
  }

  const priorityConfig = {
    low: { color: 'bg-gray-500', label: 'Low' },
    medium: { color: 'bg-yellow-500', label: 'Medium' },
    high: { color: 'bg-orange-500', label: 'High' },
    urgent: { color: 'bg-red-500', label: 'Urgent' },
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleSaveDescription = () => {
    // In real app, this would make an API call

    setIsEditing(false)
  }

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    // In real app, this would make an API call
  }

  const StatusIcon = statusConfig[status as keyof typeof statusConfig].icon
  const navigate = useNavigate()
  return (
    <div className="space-y-4">
      <Button className="flex items-center gap-x-2" onClick={() => navigate(-1)}>
        <ArrowLeft className="size-4" />
        Back
      </Button>

      <div className="desktop:flex-row flex flex-col items-start justify-between gap-y-2">
        <div>
          <h2>{maintenanceRequest.title}</h2>
          <p className="text-theme-secondary text-body-2">Request ID: {maintenanceRequest.id}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="warning">
            <StatusIcon className="mr-1 size-4" />
            {statusConfig[status as keyof typeof statusConfig].label}
          </Badge>
          <Badge variant="default">{priorityConfig[priority as keyof typeof priorityConfig].label} Priority</Badge>
        </div>
      </div>
      <div className="gap-6">
        {/* Main Content */}
        <div className="space-y-6">
          <div className="desktop:grid-cols-3 grid gap-4">
            {/* Description */}
            <Card className="desktop:col-span-2 rounded-xl shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Description</CardTitle>
                {!isEditing && (
                  <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                    <Edit3 className="size-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <Textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <div className="flex gap-2">
                      <Button className="flex items-center" onClick={handleSaveDescription}>
                        <Save className="size-4" />
                        Save
                      </Button>
                      <Button
                        className="flex items-center"
                        variant="ghost"
                        onClick={() => {
                          setIsEditing(false)
                          setEditedDescription(maintenanceRequest.description)
                        }}
                      >
                        <X className="size-4" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-theme-secondary-700">{editedDescription}</p>
                )}
              </CardContent>
            </Card>
            {/* Quick Actions */}
            <Card className="rounded-xl shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="urgent">Urgent Priority</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Request Details */}
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="size-4" />
                <div>
                  <p className="text-body-2">Created</p>
                  <p className="text-body-2 text-theme-secondary">{formatDate(maintenanceRequest.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="size-4" />
                <div>
                  <p className="text-body-2">Scheduled</p>
                  <p className="text-body-2 text-theme-secondary">{formatDate(maintenanceRequest.scheduledDate)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Wrench className="size-4" />
                <div>
                  <p className="text-body-2">Category</p>
                  <p className="text-body-2 text-theme-secondary">{maintenanceRequest.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="size-4" />
                <div>
                  <p className="text-body-2">Estimated Duration</p>
                  <p className="text-body-2 text-theme-secondary">{maintenanceRequest.estimatedDuration}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Check className="size-4" />
                <div>
                  <p className="text-body-2">Completed At</p>
                  <p className="text-body-2 text-theme-secondary">{formatDate(maintenanceRequest.scheduledDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tenant Information */}
          <Card className="rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Tenant Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={maintenanceRequest.apartment.tenant.avatar} />
                  <AvatarFallback>
                    {maintenanceRequest.apartment.tenant.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-body-2">{maintenanceRequest.apartment.tenant.name}</p>
                  <p className="text-xs">Tenant</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="size-4" />
                <div>
                  <p className="text-body-2">Unit {maintenanceRequest.apartment.unit}</p>
                  <p className="text-body-2 text-theme-secondary">{maintenanceRequest.apartment.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="size-4" />
                <p className="text-body-2 text-theme-secondary">{maintenanceRequest.apartment.tenant.phone}</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="size-4" />
                <p className="text-body-2 text-theme-secondary">{maintenanceRequest.apartment.tenant.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceDetail
