import { ArrowLeft, Building, Calendar, DollarSign, FileText, User } from 'lucide-react'

import { Button, Card, Skeleton } from '@/components/common'
import { Badge, Separator } from '@/components/ui'

const invocieDetailLoading = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="desktop:flex-row desktop:items-center desktop:justify-between flex flex-col gap-4">
        <div>
          <h3>Invoice </h3>
          <div className="flex items-center gap-2">
            <p className="text-theme-secondary text-body-2">Created</p>
            <Skeleton className="w-25 h-5" />
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="flex items-center gap-x-2">
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
                <p className="text-body-2">
                  <Skeleton />
                </p>
              </div>
              <div>
                <label className="font-medium">Description</label>
                <p className="text-body-2">
                  <Skeleton />
                </p>
              </div>
              <div className="flex items-center">
                <label className="font-medium">Category : </label>
                <Badge variant="warning" className="ml-2 capitalize">
                  <Skeleton className="h-7 w-20" />
                </Badge>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-medium">Payment Status</label>
                <Skeleton className="h-7 w-20" />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-medium">Priority</label>
                <Skeleton className="h-7 w-20" />
              </div>
              <div className="flex items-center justify-between">
                <label className="font-medium">Status</label>
                <Skeleton className="h-7 w-20" />
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
              <Skeleton className="h-8 w-20" />
            </div>

            <div className="flex items-center justify-between">
              <label className="font-medium">Paid Amount</label>
              <Skeleton className="h-8 w-20" />
            </div>
            <div className="flex items-center justify-between font-semibold">
              <label className="font-medium">Outstanding Balance</label>
              <Skeleton className="h-8 w-20" />
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
              <p className="text-body-2">
                <Skeleton />
              </p>
            </div>
            <div className="space-y-2">
              <label className="font-medium">Due Date</label>
              <p className="text-body-2">
                <Skeleton />
              </p>
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
              <p className="text-body-2">
                <Skeleton />
              </p>
            </div>
            <div>
              <label className="font-medium">Unit</label>
              <p className="text-body-2">
                <Skeleton />
              </p>
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
              <p className="text-body-2">
                <Skeleton />
              </p>
            </div>
            <div>
              <label className="font-medium">Email</label>
              <p className="text-body-2">
                <Skeleton />
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Documents & Attachments
      <Card className="rounded-2xl shadow">
        <div>
          <h4>Documents & Attachments</h4>
        </div>
        <Separator />
        <div>
          <div className="desktop:grid-cols-2 grid gap-3">
            <div className="hover:bg-theme-primary/50 border-theme-primary hover:text-theme-white flex cursor-pointer items-center gap-3 rounded-lg border p-3 duration-100">
              <FileText className="text-theme-primary size-5" />
              <span className="flex-1 truncate">{data.receiptUrls}</span>
              <Button variant="ghost" size="sm">
                <Download className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card> */}

      {/* Notes */}
      <Card className="rounded-2xl shadow">
        <div>
          <h4>Notes</h4>
        </div>
        <Separator />
        <div>
          <p className="text-body-2 leading-relaxed">
            <Skeleton />
          </p>
        </div>
      </Card>

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
                <p className="text-body-2">
                  <Skeleton />
                </p>
              </div>
              <div>
                <label className="font-medium">Created At</label>
                <p className="text-body-2">
                  <Skeleton />
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="font-medium">Last Updated</label>
                <p className="text-body-2">
                  <Skeleton />
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default invocieDetailLoading
