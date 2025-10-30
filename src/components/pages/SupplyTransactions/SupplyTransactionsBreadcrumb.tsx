import { Home, PackageOpen } from 'lucide-react'
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

const SupplyTransactionsBreadcrumb = () => {
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
          <BreadcrumbLink className="flex items-center gap-2" href={ROUTES.supplyList.getPath(apartmentId)}>
            <PackageOpen className="h-4 w-4" /> Supplies
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Supply Transactions</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default SupplyTransactionsBreadcrumb
