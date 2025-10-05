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
import { type ComponentType, type SVGProps, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

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
import { useRentoraMaintenanceDetail } from '@/hooks'

type StatusKey = 'open' | 'in-progress' | 'completed' | 'cancelled'
type PriorityKey = 'low' | 'medium' | 'high' | 'urgent'
type IconType = ComponentType<SVGProps<SVGSVGElement>>

const statusConfig: Record<StatusKey, { label: string; icon: IconType }> = {
  open: { label: 'Open', icon: AlertTriangle },
  'in-progress': { label: 'In Progress', icon: Clock },
  completed: { label: 'Completed', icon: CheckCircle },
  cancelled: { label: 'Cancelled', icon: XCircle },
}
const priorityConfig: Record<PriorityKey, { label: string }> = {
  low: { label: 'Low' },
  medium: { label: 'Medium' },
  high: { label: 'High' },
  urgent: { label: 'Urgent' },
}

const formatDate = (s?: string) => {
  if (!s) return '-'
  const d = new Date(s)
  return Number.isNaN(d.getTime())
    ? '-'
    : d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
}
const getInitials = (name?: string, limit = 2) =>
  (name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p?.[0]?.toUpperCase() ?? '')
    .slice(0, limit)
    .join('') || '?'
const isValidId = (v?: string | null) => !!v && v !== '0' // << กัน id placeholder

const MaintenanceDetail = () => {
  const navigate = useNavigate()
  const params = useParams<{ apartmentId?: string; maintenanceId?: string }>()
  const location = useLocation()

  // resolve id จาก params -> query string -> pathname
  let apartmentId = params.apartmentId
  let maintenanceId = params.maintenanceId
  if (!isValidId(apartmentId) || !isValidId(maintenanceId)) {
    const qs = new URLSearchParams(location.search)
    apartmentId = apartmentId ?? qs.get('apartmentId') ?? undefined
    maintenanceId = maintenanceId ?? qs.get('maintenanceId') ?? undefined
  }
  if (!isValidId(apartmentId) || !isValidId(maintenanceId)) {
    const m = location.pathname.match(/\/dashboard\/([^/]+)\/maintenance\/detail\/([^/]+)/i)
    if (m) {
      apartmentId = apartmentId ?? m[1]
      maintenanceId = maintenanceId ?? m[2]
    }
  }

  // states
  const [status, setStatus] = useState<StatusKey>('in-progress')
  const [priority, setPriority] = useState<PriorityKey>('medium')
  const [isEditing, setIsEditing] = useState(false)
  const [editedDescription, setEditedDescription] = useState('')

  // call hook (ตัว hook จะไม่ยิงถ้า id ไม่ valid เพราะ enabled)
  const { data, isLoading, isError, error, refetch } = useRentoraMaintenanceDetail({
    apartmentId: apartmentId ?? '',
    maintenanceId: maintenanceId ?? '',
  })
  const maintenance = useMemo(() => (data as any)?.data ?? (data as any), [data])

  useEffect(() => {
    if (!maintenance) return
    if (maintenance.status) setStatus(maintenance.status as StatusKey)
    if (maintenance.priority) setPriority(maintenance.priority as PriorityKey)
    if (maintenance.description) setEditedDescription(maintenance.description as string)
  }, [maintenance])

  // ถ้ายังไม่มี id หรือเป็น '0' แสดง empty state (ไม่ยิง API)
  if (!isValidId(apartmentId) || !isValidId(maintenanceId)) {
    return (
      <div className="space-y-3">
        <div className="text-muted-foreground text-sm">Pick a maintenance item to view its details.</div>
        <Button className="flex items-center gap-x-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="size-4" /> Back
        </Button>
      </div>
    )
  }

  if (isLoading) return <div className="text-muted-foreground text-sm">Loading maintenance detail…</div>

  if (isError) {
    return (
      <div className="space-y-2">
        <div className="text-sm text-red-600">Failed to load maintenance detail.</div>
        <pre className="bg-muted rounded p-2 text-xs">{String((error as any)?.message ?? error)}</pre>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    )
  }

  if (!maintenance) return <div className="text-sm">No data</div>

  const StatusIcon = statusConfig[status]?.icon ?? Clock
  const handleSaveDescription = () => {
    /* TODO: update API */ setIsEditing(false)
  }

  return (
    <div className="space-y-4">
      <Button className="flex items-center gap-x-2" onClick={() => navigate(-1)}>
        <ArrowLeft className="size-4" /> Back
      </Button>

      <div className="desktop:flex-row flex flex-col items-start justify-between gap-y-2">
        <div>
          <h2>{maintenance?.title ?? '-'}</h2>
          <p className="text-theme-secondary text-body-2">Request ID: {maintenance?.id ?? '-'}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="warning">
            <StatusIcon className="mr-1 size-4" />
            {statusConfig[status]?.label}
          </Badge>
          <Badge variant="default">{priorityConfig[priority]?.label} Priority</Badge>
        </div>
      </div>

      <div className="gap-6">
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
                          setEditedDescription(maintenance?.description ?? '')
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
                <Select value={status} onValueChange={(v) => setStatus(v as StatusKey)}>
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

                <Select value={priority} onValueChange={(v) => setPriority(v as PriorityKey)}>
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
                  <p className="text-body-2 text-theme-secondary">{formatDate(maintenance?.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="size-4" />
                <div>
                  <p className="text-body-2">Scheduled</p>
                  <p className="text-body-2 text-theme-secondary">{formatDate(maintenance?.scheduledDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Wrench className="size-4" />
                <div>
                  <p className="text-body-2">Category</p>
                  <p className="text-body-2 text-theme-secondary">{maintenance?.category ?? '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="size-4" />
                <div>
                  <p className="text-body-2">Estimated Duration</p>
                  <p className="text-body-2 text-theme-secondary">{maintenance?.estimatedDuration ?? '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Check className="size-4" />
                <div>
                  <p className="text-body-2">Completed At</p>
                  <p className="text-body-2 text-theme-secondary">{formatDate(maintenance?.completedAt)}</p>
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
                  <AvatarImage src={maintenance?.apartment?.tenant?.avatar} />
                  <AvatarFallback>{getInitials(maintenance?.apartment?.tenant?.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-body-2">{maintenance?.apartment?.tenant?.name ?? '-'}</p>
                  <p className="text-xs">Tenant</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="size-4" />
                <div>
                  <p className="text-body-2">Unit {maintenance?.apartment?.unit ?? '-'}</p>
                  <p className="text-body-2 text-theme-secondary">{maintenance?.apartment?.address ?? '-'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4" />
                <p className="text-body-2 text-theme-secondary">{maintenance?.apartment?.tenant?.phone ?? '-'}</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4" />
                <p className="text-body-2 text-theme-secondary">{maintenance?.apartment?.tenant?.email ?? '-'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceDetail
