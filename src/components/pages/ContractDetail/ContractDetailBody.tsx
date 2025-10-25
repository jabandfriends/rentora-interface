import { Building, Calendar, Mail, MapPin, Phone, User } from 'lucide-react'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/common'
import { Badge, EmptyPage, FieldEmpty, LoadingPage } from '@/components/ui'
import { CONTRACT_STATUS } from '@/enum'
import { useRentoraApiContractDetailByContractId } from '@/hooks'
import { formatDate } from '@/utilities'

const ContractDetailBody = () => {
    //param
    const { apartmentId, id } = useParams<{ apartmentId: string; id: string }>()

    //fetch contract detail
    const { data: contract, isLoading } = useRentoraApiContractDetailByContractId({ apartmentId, contractId: id })

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

    if (isLoading) {
        return <LoadingPage />
    }

    if (!contract) {
        return <EmptyPage title="Maintenance Not Found" description="The maintenance you're looking for doesn't exist." />
    }

    return (
        <div className="space-y-4">
            <div className="desktop:flex-row flex flex-col items-start justify-between gap-y-2">
                <div>
                    <h2>Contract Detail</h2>
                    <p className="text-theme-secondary text-body-2">Contract ID: {contract.contractId}</p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant={contractStatusBadgeVariant(contract.status)} className="capitalize">
                        {contract.status}
                    </Badge>
                </div>
            </div>
            <div className="gap-6">
                {/* Main Content */}
                <div className="space-y-6">
                    {/* <div className="grid gap-4">
                    </div> */}

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
                                    <p className="text-body-2">Guarantor Name</p>
                                    <p className="text-body-2 text-theme-secondary capitalize">{contract.guarantorName}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="text-body-2">Guarantor Phone</p>
                                    <p className="text-body-2 text-theme-secondary capitalize">{contract.guarantorPhone}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="text-body-2">Rentral Price</p>
                                    <p className="text-body-2 text-theme-secondary capitalize">{contract.rentalPrice}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="text-body-2">Rentral Type</p>
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
