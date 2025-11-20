import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Card } from '@/components/common'
import { PaginationBar } from '@/components/feature'
import { EmptyPage, PageTableHeader } from '@/components/ui'
import { DEFAULT_PAYMENT_LIST_DATA } from '@/constants'
import { useRentoraApiTenantPayments } from '@/hooks'
import type { ITenantPayment } from '@/types'

import TenantPaymentCard from './TenantPaymentCard'
import TenantPaymentListSkeleton from './TenantPaymentListSkeleton'

const TenantPaymentList = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_PAYMENT_LIST_DATA.page,
  )

  const {
    data: tenantPayments,
    isLoading: isTenantPaymentsLoading,
    pagination: { totalPages, totalElements },
  } = useRentoraApiTenantPayments({
    apartmentId: apartmentId!,
    params: {
      page: currentPage,
      size: DEFAULT_PAYMENT_LIST_DATA.size,
    },
  })

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) return
      setCurrentPage(page)
    },
    [setCurrentPage],
  )

  if (isTenantPaymentsLoading) return <TenantPaymentListSkeleton />
  if (!tenantPayments || tenantPayments.length === 0)
    return <EmptyPage title="No payments found" description="Please try again later" />
  return (
    <Card className="justify-start space-y-2 rounded-xl shadow">
      <PageTableHeader
        title="Rental Payments"
        description="View your rental payments and manage your payment methods"
      />

      <div className="desktop:grid-cols-2 grid gap-4">
        {tenantPayments.map((tenantPayment: ITenantPayment, index: number) => (
          <TenantPaymentCard
            key={tenantPayment.paymentDueDate + tenantPayment.paymentAmount + index}
            tenantPayment={tenantPayment}
          />
        ))}
      </div>
      <PaginationBar
        page={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
      />
    </Card>
  )
}

export default TenantPaymentList
