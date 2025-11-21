import {
  AlertTriangle,
  ArrowLeft,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  NotebookIcon,
  User,
} from 'lucide-react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Image } from '@/components/common'
import { Badge, EmptyPage, FieldEmpty, Separator } from '@/components/ui'
import { useRentoraApiInvoiceDetails } from '@/hooks'
import { formatCurrency } from '@/utilities'

import { InvoiceDetailEmpty, InvoiceDetailLoading } from '.'

const InvoiceDetail = () => {
  const { apartmentId, id: adhocInvoiceId } = useParams<{ apartmentId: string; id: string }>()
  const { data, isLoading } = useRentoraApiInvoiceDetails({ apartmentId, adhocInvoiceId })
  const navigate: NavigateFunction = useNavigate()
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

  if (!data) {
    return <InvoiceDetailEmpty />
  }

  if (isLoading) {
    return <InvoiceDetailLoading />
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="desktop:flex-row desktop:items-center desktop:justify-between flex flex-col gap-4">
        <div>
          <h3>Invoice {data.adhocNumber}</h3>
          <p className="text-theme-secondary text-body-2">Created {formatDate(data.createdAt)}</p>
        </div>
        <div className="flex gap-3">
          <Button className="flex items-center gap-x-2" onClick={handleBackClick}>
            <ArrowLeft className="size-4" />
            Back
          </Button>
        </div>
      </div>

      {/* Invoice Overview */}
      <div className="desktop:grid-cols-3 grid gap-4">
        <Card className="desktop:col-span-2 justify-start rounded-2xl shadow">
          <CardHeader className="flex flex-col gap-2">
            <div className="flex items-center gap-x-2">
              <FileText className="size-4" />
              <CardTitle>Invoice Overview</CardTitle>
            </div>

            <CardDescription>Invoice summary and overview</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-4">
            <div className="desktop:grid-cols-2 grid gap-6">
              <div className="space-y-4">
                <div>
                  <label className="font-medium">Title</label>
                  <p className="text-body-2">{data.title}</p>
                </div>
                <div>
                  <label className="font-medium">Description</label>
                  <p className="text-body-2">{data.description || <FieldEmpty />}</p>
                </div>
                <div className="flex justify-between">
                  <label className="font-medium">Category : </label>
                  <Badge variant="warning" className="ml-2 capitalize">
                    {data.category}
                  </Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Payment Status</label>
                  <StatusBadge status={data.paymentStatus} />
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
          </CardContent>
        </Card>

        <Card className="justify-start rounded-2xl shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-x-2">
              <FileText className="size-4" />
              Receipt
            </CardTitle>
            <CardDescription>Uploaded receipt </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent>
            {data.receiptUrls ? (
              <Image src={data.receiptUrls} alt="receipt image" width={300} />
            ) : (
              <EmptyPage title="No receipt uploaded" description="No receipt uploaded" />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Amount Details */}
      <Card className="justify-start rounded-2xl shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="size-4" />
            <span>Amount Details</span>
          </CardTitle>
          <CardDescription>
            Breakdown of the total invoice amount, payments made, and any outstanding balance.
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Total Amount</h4>
            <span className="text-theme-primary">
              {data.finalAmount ? formatCurrency(data.finalAmount) : <FieldEmpty />}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <label className="font-medium">Paid Amount</label>
            <span>{data.paidAmount ? formatCurrency(data.paidAmount) : <FieldEmpty />}</span>
          </div>
          <div className="flex items-center justify-between">
            <label className="font-medium">Outstanding Balance</label>
            <span className="text-theme-error">
              {data.paidAmount ? formatCurrency(data.finalAmount - data.paidAmount) : <FieldEmpty />}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Dates */}
      <Card className="justify-start rounded-2xl shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="size-4" />
            Important Dates
          </CardTitle>
          <CardDescription>
            Key dates related to this invoice, such as when it was created and when payment is due.
          </CardDescription>
          <Separator />
        </CardHeader>
        <CardContent className="desktop:grid-cols-2 grid gap-6">
          <div className="space-y-2">
            <label className="font-medium">Invoice Date</label>
            <p className="text-body-2">{data.invoiceDate ? formatDate(data.invoiceDate) : ''}</p>
          </div>
          <div className="space-y-2">
            <label className="font-medium">Due Date</label>
            <p className="text-body-2">{data.dueDate ? formatDate(data.dueDate) : ''}</p>
          </div>
        </CardContent>
      </Card>

      {/* Property & Tenant Information */}
      <div className="desktop:grid-cols-2 grid gap-6">
        <Card className="justify-start rounded-2xl shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="size-4" />
              Property Details
            </CardTitle>
            <CardDescription>Overview of the apartment and unit associated with this invoice.</CardDescription>
            <Separator />
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <label className="font-medium">Apartment</label>
              <p className="text-body-2">{data.apartment}</p>
            </div>
            <div>
              <label className="font-medium">Unit</label>
              <p className="text-body-2">{data.unit}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="justify-start rounded-2xl shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="size-4" />
              Tenant Information
            </CardTitle>
            <CardDescription>
              Details about the tenant responsible for this invoice, including their name and contact information.
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-4">
            <div>
              <label className="font-medium">Name</label>
              <p className="text-body-2">{data.tenantUser || <FieldEmpty />}</p>
            </div>
            <div>
              <label className="font-medium">Email</label>
              <p className="text-body-2">{data.email || <FieldEmpty />}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="justify-start rounded-2xl shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <NotebookIcon className="size-4" />
            Notes
          </CardTitle>
          <CardDescription>Additional remarks or information related to this invoice.'</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <p className="text-body-2">
            {data?.notes && data.notes.trim().length > 0 ? (
              data.notes
            ) : (
              <span className="text-body-2 text-theme-secondary">No notes provided.</span>
            )}
          </p>
        </CardContent>
      </Card>

      {/* Administrative Details */}
      <Card className="justify-start rounded-2xl shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-4" />
            Administrative Details
          </CardTitle>
          <CardDescription>
            Information regarding creation and update history of this invoice, including the creator and relevant
            timestamps.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="desktop:grid-cols-2 grid gap-6">
          <div className="space-y-4">
            <div>
              <label className="font-medium">Created At</label>
              <p className="text-body-2">{formatDate(data.createdAt)}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="font-medium">Last Updated</label>
              <p className="text-body-2">{formatDate(data.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default InvoiceDetail
