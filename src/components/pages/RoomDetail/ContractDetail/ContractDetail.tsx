import { AlertCircle, Building, Calendar, DollarSign, FileText, Shield, User } from 'lucide-react'
import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import type { VariantProps } from 'tailwind-variants'

import { Button, Card, Spinner } from '@/components/common'
import { Badge } from '@/components/ui'
import { CONTRACT_STATUS } from '@/enum'
import { type IContract, type Maybe } from '@/types'
import { contractHandlePDFDownload, formatCurrency, formatDate } from '@/utilities'

import RoomDetailContract from '../RoomDetailContract'
import ContractAction from './ContractAction'
import ContractDetailLoading from './ContractDetailLoading'
import InfoRow from './InfoRow'
import Section from './Section'

type IContractDetailProps = {
  data: Maybe<IContract>
  isLoading: boolean
  handleOpenDeleteModal: () => void
}

const ContractDetail = ({ data, isLoading, handleOpenDeleteModal }: IContractDetailProps) => {
  const [isCollapse, setIsCollapse]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
  const [isExporting, setIsExporting]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

  const contractStatusBadge: VariantProps<typeof Badge>['variant'] = useMemo(() => {
    switch (data?.status) {
      case CONTRACT_STATUS.ACTIVE:
        return 'success'
      case CONTRACT_STATUS.EXPIRED:
        return 'error'
      case CONTRACT_STATUS.TERMINATED:
        return 'warning'
      default:
        return 'default'
    }
  }, [data?.status])

  const buttonText: string = useMemo(() => {
    return isCollapse ? 'See less detail' : 'See more detail'
  }, [isCollapse])

  const handleCollapse: () => void = useCallback(() => {
    setIsCollapse((prev) => !prev)
  }, [])

  const handleDownload = useCallback(async () => {
    if (!data) {
      return
    }
    try {
      setIsExporting(true)
      await contractHandlePDFDownload(data)

      toast.success('Contract downloaded successfully!')
      setIsExporting(false)
      //eslint-disable-next-line
    } catch (_) {
      setIsExporting(false)
    }
  }, [data])

  if (isLoading) {
    return <ContractDetailLoading />
  }

  if (!data) {
    return <RoomDetailContract />
  }

  return (
    <Card className="justify-start rounded-2xl shadow">
      <div className="space-y-2">
        {/* Header */}
        <div className="border-theme-secondary-300 space-y-6 rounded-lg border p-6 shadow-sm">
          <div className="desktop:flex-row flex flex-col items-start justify-between gap-4">
            <div>
              <h3>{data.contractNumber}</h3>
              <p className="text-body-2 text-theme-secondary">
                Created by {data.createdByUserName} on {formatDate(new Date(data.createdAt))}
              </p>
            </div>
            <div className="desktop:flex-col desktop:w-auto desktop:items-end flex w-full items-center justify-between gap-y-2">
              <Badge variant={contractStatusBadge}>{data.status.toUpperCase()}</Badge>
              <ContractAction handleOpenDeleteModal={handleOpenDeleteModal} />
            </div>
          </div>

          {data.daysUntilExpiry <= 30 && data.daysUntilExpiry > 0 && (
            <div className="bg-theme-warning-100/60 border-theme-warning-300 flex items-center gap-2 rounded-lg border p-3">
              <AlertCircle className="text-theme-warning-600 h-4 w-4 flex-shrink-0" />
              <p className="text-theme-warning-800 text-body-2">
                <span className="font-semibold">{data.daysUntilExpiry} days</span> until contract expiry
              </p>
            </div>
          )}
        </div>

        <div className="desktop:grid-cols-2 grid gap-2">
          {/* Property Information */}
          <Section title="Property Information" icon={Building}>
            <div className="space-y-0 p-4">
              <InfoRow label="Apartment" value={data.apartmentName} />
              <InfoRow label="Building" value={data.buildingName} />
              <InfoRow label="Unit" value={data.unitName} />
            </div>
          </Section>

          {/* Tenant Information */}
          <Section title="Tenant Information" icon={User}>
            <div className="space-y-0 p-4">
              <InfoRow label="Name" value={data.tenantName} />
              <InfoRow label="Email" value={data.tenantEmail} />
              <InfoRow label="Phone" value={data.tenantPhone} />
            </div>
          </Section>

          {isCollapse && (
            <>
              <Section title="Guarantor Information" icon={Shield}>
                <div className="space-y-0 p-4">
                  <InfoRow label="Name" value={data.guarantorName} />
                  <InfoRow label="Phone" value={data.guarantorPhone} />
                  <InfoRow label="ID Number" value={data.guarantorIdNumber} />
                </div>
              </Section>

              <Section title="Contract Terms" icon={Calendar}>
                <div className="space-y-0 p-4">
                  <InfoRow
                    label="Rental Type"
                    value={data.rentalType.charAt(0).toUpperCase() + data.rentalType.slice(1)}
                  />
                  <InfoRow label="Start Date" value={formatDate(new Date(data.startDate))} />
                  <InfoRow label="End Date" value={formatDate(new Date(data.endDate))} />
                  <InfoRow label="Duration" value={`${data.contractDurationDays} days`} />
                  <InfoRow label="Auto Renewal" value={data.autoRenewal ? 'Yes' : 'No'} />
                  <InfoRow label="Renewal Notice" value={`${data.renewalNoticeDays} days`} />
                </div>
              </Section>

              <Section title="Financial Details" icon={DollarSign}>
                <div className="space-y-0 p-4">
                  <InfoRow label="Rental Price" value={formatCurrency(data.rentalPrice)} />
                  <InfoRow label="Deposit Amount" value={formatCurrency(data.depositAmount)} />
                  <InfoRow label="Advance Payment" value={`${data.advancePaymentMonths} months`} />
                  <InfoRow label="Late Fee" value={formatCurrency(data.lateFeeAmount)} />
                  <InfoRow label="Utilities Included" value={data.utilitiesIncluded ? 'Yes' : 'No'} />
                </div>
              </Section>

              <Section title="Document Information" icon={FileText}>
                <div className="space-y-0 p-4">
                  <InfoRow label="Document URL" value={data.documentUrl || 'Not uploaded'} />
                  <InfoRow label="Signed At" value={data.signedAt ? formatDate(data.signedAt) : 'Not signed'} />
                  <InfoRow label="Last Updated" value={formatDate(new Date(data.updatedAt))} />
                </div>
              </Section>

              {data.terminationDate && (
                <Section title="Termination Information" icon={AlertCircle}>
                  <div className="space-y-0 p-4">
                    <InfoRow label="Termination Date" value={formatDate(data.terminationDate)} />
                    <InfoRow label="Reason" value={data.terminationReason} />
                    <InfoRow label="Terminated By" value={data.terminatedByUserName} />
                  </div>
                </Section>
              )}
            </>
          )}
        </div>
      </div>

      <div className="desktop:flex-row flex flex-col justify-between gap-y-2">
        <div className="flex items-center justify-end">
          <Button onClick={handleCollapse}>{buttonText}</Button>
        </div>
        {isCollapse && (
          <div className="flex items-center justify-end">
            <Button variant="outline" disabled={isExporting} onClick={handleDownload}>
              {isExporting ? <Spinner /> : 'Export Contract PDF '}
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

export default ContractDetail
