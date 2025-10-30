import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

import { PageTableBody, PageTableHeader } from '@/components/ui'
import { DEFAULT_SUPPLY_TRANSACTION_LIST_DATA } from '@/constants'
import { useRentoraApiSupplyTransactionList } from '@/hooks'

import SupplyTransactionTable from './SupplyTransactionTable'

const SupplyTransactionBody = () => {
  const { apartmentId } = useParams<{ apartmentId: string }>()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState<number>(
    DEFAULT_SUPPLY_TRANSACTION_LIST_DATA.page,
  )
  const {
    data: supplyTransactionList,
    isLoading: isSupplyTransactionListLoading,
    isError: isSupplyTransactionListError,
    pagination: { totalPages, totalElements },
  } = useRentoraApiSupplyTransactionList({
    apartmentId: apartmentId,
    params: {
      page: currentPage,
      size: DEFAULT_SUPPLY_TRANSACTION_LIST_DATA.size,
    },
  })

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1) return
      setCurrentPage(page)
    },
    [setCurrentPage],
  )

  return (
    <PageTableBody className="space-y-4">
      <PageTableHeader title="Supply Transactions" description="View all supply transactions here!" />
      <SupplyTransactionTable
        currentPage={currentPage}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={handlePageChange}
        data={supplyTransactionList}
        isLoading={isSupplyTransactionListLoading}
        isError={isSupplyTransactionListError}
      />
    </PageTableBody>
  )
}

export default SupplyTransactionBody
