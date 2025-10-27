import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { Card, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { DEFAULT_CONTRACT_LIST_DATA } from '@/constants'
import { CONTRACT_STATUS } from '@/enum/contract'
import { useRentoraApiContractList } from '@/hooks'

import RoomDetailContractTable from './RoomDetailContractTable'

const RoomDetailOutStandingContract = () => {
  const { apartmentId, id: unitId } = useParams<{ apartmentId: string; id: string }>()
  const [currentPage, setCurrentPage]: [number, Dispatch<SetStateAction<number>>] = useState(
    DEFAULT_CONTRACT_LIST_DATA.page,
  )

  const { watch, setValue } = useForm<{
    contractStatus: CONTRACT_STATUS
  }>({
    defaultValues: {
      contractStatus: '' as CONTRACT_STATUS,
    },
  })

  const [contractStatus]: [CONTRACT_STATUS] = watch(['contractStatus'])

  const {
    data: allContracts,
    isLoading: isLoadingContracts,
    pagination: { totalPages, totalElements },
  } = useRentoraApiContractList(apartmentId, {
    unitId: unitId,
    contractStatus: contractStatus || undefined,
    page: currentPage,
    size: DEFAULT_CONTRACT_LIST_DATA.size,
  })

  const handleStatusChange = useCallback(
    (value: CONTRACT_STATUS) => {
      setValue('contractStatus', value)
      setCurrentPage(DEFAULT_CONTRACT_LIST_DATA.page)
    },
    [setValue, setCurrentPage],
  )

  const handlePageChange = useCallback((page: number) => {
    if (page < 1) return
    setCurrentPage(page)
  }, [])

  return (
    <Card className="rounded-2xl shadow-lg hover:shadow-xl">
      <div className="border-theme-secondary-400 desktop:flex-row desktop:items-center flex flex-col justify-between gap-y-2 border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3>All Contracts</h3>
            <p className="text-body-2 text-theme-secondary-600">Track pending contract transitions</p>
          </div>
        </div>
        <Select value={contractStatus} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select contract status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={CONTRACT_STATUS.TERMINATED}>Terminated</SelectItem>
            <SelectItem value={CONTRACT_STATUS.ACTIVE}>Active</SelectItem>
            <SelectItem value={CONTRACT_STATUS.EXPIRED}>Expired</SelectItem>
            <SelectItem value={CONTRACT_STATUS.RENEWED}>Renewed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <RoomDetailContractTable
        isLoading={isLoadingContracts}
        contracts={allContracts}
        totalElements={totalElements}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </Card>
  )
}

export default RoomDetailOutStandingContract
