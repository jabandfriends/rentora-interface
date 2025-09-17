import {
  AlertTriangle,
  ArrowLeft,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  FileText,
  User,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button, Card } from '@/components/common'
import { Badge, Separator } from '@/components/ui'

type IInvoice = {
  id: string
  adhoc_number: string
  title: string
  description: string
  category: string
  final_amount: number
  invoice_date: string
  due_date: string
  payment_status: string
  paid_amount: number
  status: string
  priority: string
  apartment: string
  unit: string
  tenant_name: string
  tenant_email: string
  created_by: string
  notes: string
  receipt_urls: Array<string>
  created_at: string
  updated_at: string
}

type IInvoiceDetailProps = {
  data: IInvoice
}
const InvoiceDetail = ({ data }: IInvoiceDetailProps) => {
  const navigate = useNavigate()
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'default'
      case 'unpaid':
        return 'error'
      case 'cancelled':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'error'
      case 'high':
        return 'error'
      case 'normal':
        return 'default'
      case 'low':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  const StatusBadge = ({ status }: { status: string }) => (
    <Badge variant={getStatusBadgeVariant(status)} className="capitalize">
      {status === 'paid' && <CheckCircle className="mr-1 h-3 w-3" />}
      {status === 'unpaid' && <Clock className="mr-1 h-3 w-3" />}
      {status === 'cancelled' && <AlertTriangle className="mr-1 h-3 w-3" />}
      {status}
    </Badge>
  )

  const PriorityBadge = ({ priority }: { priority: string }) => (
    <Badge variant={getPriorityBadgeVariant(priority)} className="capitalize">
      {priority}
    </Badge>
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  const handleBackClick = () => {
    navigate(-1)
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="desktop:flex-row desktop:items-center desktop:justify-between flex flex-col gap-4">
        <div>
          <h3>Invoice {data.adhoc_number}</h3>
          <p className="text-theme-secondary text-body-2">Created {formatDate(data.created_at)}</p>
        </div>
        <div className="flex gap-3">
          <Button className="flex items-center gap-x-2" variant="outline">
            <Download className="size-4" />
            Download PDF
          </Button>
          <Button className="flex items-center gap-x-2" onClick={handleBackClick}>
            <ArrowLeft className="size-4" />
            Back
          </Button>
        </div>
      </div>

      {/* Invoice Overview */}
      <Card className="rounded-2xl shadow">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="size-5" />
            <h4>Invoice Overview</h4>
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="desktop:grid-cols-2 grid gap-6">
            <div className="space-y-4">
              <div>
                <label className="font-medium">Title</label>
                <p className="text-body-2">{data.title}</p>
              </div>
              <div>
                <label className="font-medium">Description</label>
                <p className="text-body-2">{data.description}</p>
              </div>
              <div>
                <label className="font-medium">Category : </label>
                <Badge variant="warning" className="ml-2 capitalize">
                  {data.category}
                </Badge>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-medium">Payment Status</label>
                <StatusBadge status={data.payment_status} />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-medium">Priority</label>
                <PriorityBadge priority={data.priority} />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-medium">Status</label>
                <Badge variant="default" className="capitalize">
                  {data.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Amount Details */}
      <Card className="rounded-2xl shadow">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="size-5" />
            <h4>Amount Details</h4>
          </div>
        </div>
        <Separator />
        <div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-2xl font-bold">
              <span>Total Amount</span>
              <span className="text-theme-primary">{formatCurrency(data.final_amount)}</span>
            </div>

            <div className="flex items-center justify-between">
              <label className="font-medium">Paid Amount</label>
              <span>{formatCurrency(data.paid_amount)}</span>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <label className="font-medium">Outstanding Balance</label>
              <span className="text-theme-error">{formatCurrency(data.final_amount - data.paid_amount)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Dates */}
      <Card className="rounded-2xl shadow">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="size-5" />
            <h4>Important Dates</h4>
          </div>
        </div>
        <Separator />
        <div>
          <div className="desktop:grid-cols-2 grid gap-6">
            <div className="space-y-2">
              <label className="font-medium">Invoice Date</label>
              <p className="text-body-2">{formatDate(data.invoice_date)}</p>
            </div>
            <div className="space-y-2">
              <label className="font-medium">Due Date</label>
              <p className="text-body-2">{formatDate(data.due_date)}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Property & Tenant Information */}
      <div className="desktop:grid-cols-2 grid gap-6">
        <Card className="rounded-2xl shadow">
          <div>
            <div className="flex items-center gap-2">
              <Building className="size-5" />
              <h4>Property Details</h4>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <div>
              <label className="font-medium">Apartment</label>
              <p className="text-body-2">{data.apartment}</p>
            </div>
            <div>
              <label className="font-medium">Unit</label>
              <p className="text-body-2">{data.unit}</p>
            </div>
          </div>
        </Card>

        <Card className="rounded-2xl shadow">
          <div>
            <div className="flex items-center gap-2">
              <User className="size-5" />
              <h4>Tenant Information</h4>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <div>
              <label className="font-medium">Name</label>
              <p className="text-body-2">{data.tenant_name}</p>
            </div>
            <div>
              <label className="font-medium">Email</label>
              <p className="text-body-2">{data.tenant_email}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Documents & Attachments */}
      {data.receipt_urls.length > 0 && (
        <Card className="rounded-2xl shadow">
          <div>
            <h4>Documents & Attachments</h4>
          </div>
          <Separator />
          <div>
            <div className="desktop:grid-cols-2 grid gap-3">
              {data.receipt_urls.map((url, index) => (
                <div
                  key={index}
                  className="hover:bg-theme-primary/50 border-theme-primary hover:text-theme-white flex cursor-pointer items-center gap-3 rounded-lg border p-3 duration-100"
                >
                  <FileText className="text-theme-primary size-5" />
                  <span className="flex-1 truncate">{url}</span>
                  <Button variant="ghost" size="sm">
                    <Download className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Notes */}
      {data.notes && (
        <Card className="rounded-2xl shadow">
          <div>
            <h4>Notes</h4>
          </div>
          <Separator />
          <div>
            <p className="text-sm leading-relaxed">{data.notes}</p>
          </div>
        </Card>
      )}

      {/* Administrative Details */}
      <Card className="rounded-2xl shadow">
        <div>
          <h4>Administrative Details</h4>
        </div>
        <Separator />
        <div>
          <div className="desktop:grid-cols-2 grid gap-6">
            <div className="space-y-4">
              <div>
                <label className="font-medium">Created By</label>
                <p className="text-body-2">{data.created_by}</p>
              </div>
              <div>
                <label className="font-medium">Created At</label>
                <p className="text-body-2">{formatDate(data.created_at)}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-medium">Last Updated</label>
                <p className="text-body-2">{formatDate(data.updated_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default InvoiceDetail
