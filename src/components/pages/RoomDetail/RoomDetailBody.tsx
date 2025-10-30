import { type Dispatch, type SetStateAction, useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Spinner } from '@/components/common'
import { ContractDeleteModal, ContractDetail } from '@/components/pages/RoomDetail/ContractDetail'
import { Badge, EmptyPage } from '@/components/ui'
import { useRentoraApiContractDetail, useRentoraApiContractTerminate, useRentoraApiUnitDetail } from '@/hooks'
import type { TerminationFormValues } from '@/types'
import { getErrorMessage } from '@/utilities'

import RoomDetailContractList from './RoomDetailContractList'
import RoomDetailMaintenanceList from './RoomDetailMaintenanceList'
import RoomDetailServices from './RoomDetailServices'

const RoomDetailBody = () => {
  const [isOpenDeleteModal, setOpenDeleteModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

  const handleOpenModal = useCallback(() => {
    setOpenDeleteModal(true)
  }, [])
  //param
  const { apartmentId, id: unitId } = useParams<{ apartmentId: string; id: string }>()
  //fetch current contract
  const { data: currentContract, isLoading: isLoadingContract } = useRentoraApiContractDetail({
    apartmentId: apartmentId!,
    unitId: unitId!,
  })

  const { mutateAsync: terminateContract } = useRentoraApiContractTerminate({
    apartmentId: apartmentId!,
    unitId: unitId!,
  })
  const { data: unitData, isLoading: isLoadingUnit } = useRentoraApiUnitDetail({
    apartmentId: apartmentId!,
    unitId: unitId!,
  })

  const handleSubmit = useCallback(
    (data: TerminationFormValues) => {
      try {
        terminateContract({ terminationReason: data.terminationReason })
        toast.success('Contract terminated successfully!')
        setOpenDeleteModal(false)
      } catch (error) {
        toast.error(getErrorMessage(error))
      }
    },
    [terminateContract],
  )

  const isLoading: boolean = useMemo(() => isLoadingContract || isLoadingUnit, [isLoadingContract, isLoadingUnit])

  if (isLoading) {
    return (
      <EmptyPage
        icon={<Spinner />}
        title="Loading unit information..."
        description="Please wait while we load the data."
      />
    )
  }
  if (!unitData) {
    return (
      <EmptyPage title="Unit information not found" description="Unit information not found. Please try again later." />
    )
  }
  return (
    <>
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3>{unitData.unitName}</h3>
          <Badge className="capitalize">{unitData.unitStatus}</Badge>
        </div>

        <p className="text-theme-secondary text-body-2">
          {unitData.buildingName} - {unitData.floorName}
        </p>
      </div>

      <ContractDeleteModal
        isOpenDeleteModal={isOpenDeleteModal}
        handleOpenModal={setOpenDeleteModal}
        handleSubmit={handleSubmit}
      />
      <div className="desktop:grid-cols-2 grid gap-2">
        {/* Left Column - Contract Details */}
        <ContractDetail handleOpenDeleteModal={handleOpenModal} data={currentContract} isLoading={isLoading} />

        {/* Right Column - Service Addition */}
        <RoomDetailServices />
      </div>

      <RoomDetailContractList />
      <RoomDetailMaintenanceList />
    </>
  )
}

export default RoomDetailBody
