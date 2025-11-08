import { Building2, Home } from 'lucide-react'
import { useParams } from 'react-router-dom'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui'
import { ROUTES } from '@/constants'

const AdhocBreadcrumb = () => {
    const { apartmentId } = useParams<{ apartmentId: string }>()

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink className="flex items-center gap-2" href={ROUTES.overview.getPath(apartmentId)}>
                        <Home className="h-4 w-4" /> Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink className="flex items-center gap-2" href={ROUTES.normalInvoice.getPath(apartmentId)}>
                        <Building2 className="h-4 w-4" /> Adhoc Invoices
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Create Adhoc Invoice</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default AdhocBreadcrumb
