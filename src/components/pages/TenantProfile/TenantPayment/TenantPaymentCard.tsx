import { CheckCircle, Clock, Download, Upload, XCircle } from 'lucide-react'
import { type Dispatch, type ReactNode, type SetStateAction, useCallback, useMemo, useState } from 'react'
import type { VariantProps } from 'tailwind-variants'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { PaymentReceiptModal } from '@/components/pages/Payment'
import { Badge, Separator } from '@/components/ui'
import { PaymentStatus, VerifiedStatus } from '@/enum'
import type { ITenantPayment } from '@/types'
import { formatCurrency, formatDate } from '@/utilities'

import TenantPaymentUploadReceiptModal from './TenantPaymentUploadReceiptModal'

type ITenantPaymentCardProps = {
  tenantPayment: ITenantPayment
}
const TenantPaymentCard = ({ tenantPayment }: ITenantPaymentCardProps) => {
  const [isPaymentReceiptModalOpen, setIsPaymentReceiptModalOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false)
  const [isTenantPaymentUploadReceiptModalOpen, setIsTenantPaymentUploadReceiptModalOpen]: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] = useState(false)

  const handleOpenTenantPaymentUploadReceiptModal = useCallback(() => {
    setIsTenantPaymentUploadReceiptModalOpen(true)
  }, [setIsTenantPaymentUploadReceiptModalOpen])

  const handleOpenPaymentReceiptModal = useCallback(() => {
    setIsPaymentReceiptModalOpen(true)
  }, [setIsPaymentReceiptModalOpen])
  const {
    paymentStatusIcon,
    paymentStatus,
    paymentVariant,
  }: {
    paymentStatusIcon: ReactNode
    paymentStatus: string
    paymentVariant: VariantProps<typeof Badge>['variant']
  } = useMemo(() => {
    switch (tenantPayment.paymentStatus) {
      case PaymentStatus.COMPLETED:
        return {
          paymentStatusIcon: <CheckCircle size={16} />,
          paymentStatus: 'Paid',
          paymentVariant: 'success',
        }
      case PaymentStatus.PENDING:
        return {
          paymentStatusIcon: <Clock size={16} />,
          paymentStatus: 'Pending',
          paymentVariant: 'default',
        }
      case PaymentStatus.FAILED:
        return {
          paymentStatusIcon: <XCircle size={16} />,
          paymentStatus: 'Failed',
          paymentVariant: 'error',
        }
      default:
        return {
          paymentStatusIcon: <XCircle size={16} />,
          paymentStatus: 'Pending',
          paymentVariant: 'default',
        }
    }
  }, [tenantPayment])

  const {
    verifiedStatusIcon,
    verifiedStatus,
  }: {
    verifiedStatusIcon: ReactNode
    verifiedStatus: string
  } = useMemo(() => {
    switch (tenantPayment.verificationStatus) {
      case VerifiedStatus.PENDING:
        return {
          verifiedStatusIcon: <Clock size={16} />,
          verifiedStatus: 'Pending',
        }
      case VerifiedStatus.VERIFIED:
        return {
          verifiedStatusIcon: <CheckCircle size={16} />,
          verifiedStatus: 'Verified',
        }
      case VerifiedStatus.REJECTED:
        return {
          verifiedStatusIcon: <XCircle size={16} />,
          verifiedStatus: 'Rejected',
        }
      default:
        return {
          verifiedStatusIcon: <Clock size={16} />,
          verifiedStatus: 'Pending',
        }
    }
  }, [tenantPayment])

  return (
    <>
      <PaymentReceiptModal
        open={isPaymentReceiptModalOpen}
        onOpenChange={setIsPaymentReceiptModalOpen}
        receiptUrl={tenantPayment.paymentReceiptUrl}
      />
      <TenantPaymentUploadReceiptModal
        open={isTenantPaymentUploadReceiptModalOpen}
        onOpenChange={setIsTenantPaymentUploadReceiptModalOpen}
        payment={tenantPayment}
      />
      <Card className="border-theme-secondary-300 rounded-xl border shadow-none hover:shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{tenantPayment.invoiceNumber}</CardTitle>
              <CardDescription>
                Due : {formatDate(new Date(tenantPayment.paymentDueDate), 'DD/MM/YYYY')}
              </CardDescription>
            </div>
            <div className="flex items-center gap-x-2">
              <Badge variant={paymentVariant}>
                {paymentStatusIcon}
                {paymentStatus}
              </Badge>
            </div>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4">
          {/* verified status */}
          <div className="flex items-center gap-x-2">
            <p className="text-theme-secondary text-body-2">Verified Status :</p>
            <Badge variant="outline">
              {verifiedStatusIcon}
              {verifiedStatus}
            </Badge>
          </div>
          <div className="desktop:flex-row desktop:items-center flex flex-col justify-between gap-y-2">
            <div>
              <h5 className="font-semibold">Amount</h5>
              <p className="text-theme-secondary">{formatCurrency(tenantPayment.paymentAmount)}</p>
            </div>
            <div>
              <h5 className="font-semibold">Paid Date</h5>
              <p className="text-theme-secondary">{formatDate(new Date(tenantPayment.paidDate), 'DD/MM/YYYY')}</p>
            </div>

            {tenantPayment.paymentReceiptUrl ? (
              <Button
                onClick={handleOpenPaymentReceiptModal}
                className="desktop:w-auto flex w-full items-center gap-x-2"
                variant="outline"
              >
                <Download size={16} />
                Receipt
              </Button>
            ) : (
              <Button
                onClick={handleOpenTenantPaymentUploadReceiptModal}
                className="desktop:w-auto flex w-full items-center gap-x-2"
                variant="outline"
              >
                <Upload size={16} />
                Upload Receipt
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default TenantPaymentCard
