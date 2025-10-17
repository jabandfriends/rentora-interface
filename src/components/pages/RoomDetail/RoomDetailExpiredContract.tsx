import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Card } from '@/components/common'
import { DEFAULT_CONTRACT_LIST_DATA } from '@/constants'
import { CONTRACT_STATUS } from '@/enum'
import { useRentoraApiContractList } from '@/hooks'

import RoomDetailContractTable from './RoomDetailContractTable'

const RoomDetailExpiredContract = () => {
  const { apartmentId, id: unitId } = useParams<{ apartmentId: string; id: string }>()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_CONTRACT_LIST_DATA.page,
  )
  const {
    data: expiredContracts,
    pagination: { totalPages, totalElements },
    isLoading: isLoadingExpiredContracts,
  } = useRentoraApiContractList(apartmentId, {
    contractStatus: CONTRACT_STATUS.EXPIRED,
    unitId,
    page: currentPage,
    size: DEFAULT_CONTRACT_LIST_DATA.size,
  })

  const handlePageChange = useCallback((page: number) => {
    if (page < 1) return
    setCurrentPage(page)
  }, [])

  return (
    <Card className="rounded-2xl shadow-lg hover:shadow-xl">
      <div className="border-theme-secondary-400 border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3>Expired Contract Contracts</h3>
            <p className="text-body-2 text-theme-secondary-600">Track pending contract transitions</p>
          </div>
        </div>
      </div>
      <RoomDetailContractTable
        isLoading={isLoadingExpiredContracts}
        contracts={expiredContracts}
        totalElements={totalElements}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </Card>
  )
}

export default RoomDetailExpiredContract
