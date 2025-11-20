import { ArrowLeft, BookUser, Building, User } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/common'
import { PageHeader } from '@/components/layout'
import InfoCard from '@/components/pages/ContractDetail/infocard'
import { Badge, EmptyPage, LoadingPage } from '@/components/ui'
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
      <div className="flex items-center gap-3" />
      <div className="gap-6">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Tenant Information */}
          <Card className="justify-start rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-theme-primary">
                <div className="flex items-center gap-2">
                  <User className="size-4" />
                  <span>Tenant Information</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="desktop:flex-row flex flex-col items-center gap-3">
                <div className="border-theme-secondary-300 size-18 flex items-center justify-center rounded-full border bg-gray-200">
                  <User className="text-theme-secondary size-8" />
                </div>
                <div className="desktop:flex-row desktop:items-center flex flex-col items-center justify-center gap-2">
                  <h3 className="font-semibold">{contract.tenantName}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={contractStatusBadgeVariant(contract.status)} className="capitalize">
                      {contract.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <InfoCard icon="mail" label="Email" value={contract.tenantEmail} />

              <InfoCard icon="phone" label="Phone Number" value={contract.tenantPhone || null} />
            </CardContent>
          </Card>
          {/* Contract Information */}
          <Card className="justify-start rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-theme-primary">
                <div className="flex items-center gap-2">
                  <BookUser className="size-4" />
                  <span>Contract Infomation</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoCard
                icon="calendar"
                label="Created"
                value={contract.createdAt ? formatDate(new Date(contract.createdAt), 'DD-MM-YYYY') : null}
              />

              <div className="desktop:grid desktop:grid-cols-2 flex flex-col gap-6">
                <div>
                  <p className="text-body-1 text-theme-secondary-400 font-medium capitalize">Rental Price</p>
                  <p className="text-body-1 mb-0.5 font-medium">{formatCurrency(contract.rentalPrice)}</p>
                </div>
                <div>
                  <p className="text-body-1 text-theme-secondary-400 font-medium capitalize">Rental Type</p>
                  <p className="text-body-1 mb-0.5 font-medium capitalize">{contract.rentalType}</p>
                </div>
              </div>

              <div className="desktop:grid desktop:grid-cols-2 flex flex-col gap-6">
                <div>
                  <p className="text-body-1 text-theme-secondary-400 font-medium capitalize">Start Date</p>
                  <p className="text-body-1 mb-0.5 font-medium">{contract.startDate}</p>
                </div>
                <div>
                  <p className="text-body-1 text-theme-secondary-400 font-medium capitalize">End Date</p>
                  <p className="text-body-1 mb-0.5 font-medium">{contract.endDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Information */}
          <Card className="justify-start rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-theme-primary">
                <div className="flex items-center gap-2">
                  <Building className="size-4" />
                  <span>Property Information</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoCard icon="location" label="Apartment" value={contract.apartmentName} />

              <InfoCard icon="building" label="Building" value={contract.buildingName} />

              <InfoCard icon="home" label="Unit" value={contract.unitName} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default ContractDetailBody
