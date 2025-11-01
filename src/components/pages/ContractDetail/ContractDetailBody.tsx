import { ArrowLeft, Building, Calendar, Mail, MapPin, Phone, User } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/common'
import { PageHeader } from '@/components/layout'
import { Badge, EmptyPage, FieldEmpty, LoadingPage } from '@/components/ui'
import { CONTRACT_STATUS } from '@/enum'
import { useRentoraApiContractDetailByContractId } from '@/hooks'
import { formatCurrency, formatDate } from '@/utilities'

const ContractDetailBody = () => {
  const navigate: NavigateFunction = useNavigate()
  const navigateBefore = useCallback(() => navigate(-1), [navigate])
  //param
  const { apartmentId, id: contractId } = useParams<{ apartmentId: string; id: string }>()

  //fetch contract detail
  const { data: contract, isLoading: isContractDetailLoading } = useRentoraApiContractDetailByContractId({
    apartmentId,
    contractId: contractId,
  })

  const contractStatusBadgeVariant = useCallback((status: CONTRACT_STATUS): VariantProps<typeof Badge>['variant'] => {
    switch (status) {
      case CONTRACT_STATUS.ACTIVE:
        return 'success'
      case CONTRACT_STATUS.EXPIRED:
        return 'warning'
      case CONTRACT_STATUS.TERMINATED:
        return 'error'
      default:
        return 'default'
    }
  }, [])

  if (isContractDetailLoading) {
    return <LoadingPage />
  }

  if (!contract) {
    return <EmptyPage title="Contract Not Found" description="The Contract you're looking for doesn't exist." />
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title="Contract Detail"
        description={`Contract Number: #${contract.contractNumber}`}
        isAction
        actionLabel="Back"
        actionIcon={<ArrowLeft />}
        actionOnClick={navigateBefore}
      />
      <div className="flex items-center gap-3">
        <Badge variant={contractStatusBadgeVariant(contract.status)} className="capitalize">
          {contract.status}
        </Badge>
      </div>
      <div className="gap-6">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Contract Information */}
          <Card className="justify-start rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Contract Infomation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="size-4" />
                <div>
                  <p className="text-body-2">Created</p>
                  <p className="text-body-2 text-theme-secondary">
                    {contract.createdAt ? formatDate(new Date(contract.createdAt)) : <FieldEmpty />}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <p className="text-body-2">Rental Price</p>
                  <p className="text-body-2 text-theme-secondary capitalize">{formatCurrency(contract.rentalPrice)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <p className="text-body-2">Rental Type</p>
                  <p className="text-body-2 text-theme-secondary capitalize">{contract.rentalType}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <p className="text-body-2">Start Date</p>
                  <p className="text-body-2 text-theme-secondary capitalize">{contract.startDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <p className="text-body-2">End Date</p>
                  <p className="text-body-2 text-theme-secondary capitalize">{contract.endDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Information */}
          <Card className="justify-start rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="size-4" />
                <div>
                  <p className="text-body-2">Apartment</p>
                  <p className="text-body-2 text-theme-secondary">{contract.apartmentName || <FieldEmpty />}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Building className="size-4" />
                <div>
                  <p className="text-body-2">Building</p>
                  <p className="text-body-2 text-theme-secondary">{contract.buildingName || <FieldEmpty />}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <p className="text-body-2">Unit</p>
                  <p className="text-body-2 text-theme-secondary">{contract.unitName || <FieldEmpty />}</p>
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
                <User className="size-4" />
                <div>
                  <p className="text-body-2">Tenant Name</p>
                  <p className="text-body-2 text-theme-secondary">{contract.tenantName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="size-4" />
                <div>
                  <p className="text-body-2">Tenant Name</p>
                  <p className="text-body-2 text-theme-secondary">{contract.tenantEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="size-4" />
                <div>
                  <p className="text-body-2">Tenant Name</p>
                  <p className="text-body-2 text-theme-secondary">{contract.tenantEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ContractDetailBody
