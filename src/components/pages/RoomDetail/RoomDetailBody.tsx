import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { ContractDetail, ContractDetailLoading } from '@/components/pages/RoomDetail/ContractDetail'
import { useRentoraApiContractDetail } from '@/hooks'

import RoomDetailContract from './RoomDetailContract'
import RoomDetailOutStandingContract from './RoomDetailOutStandingContract'
import RoomDetailReservationList from './RoomDetailReservationList'
import RoomDetailServices from './RoomDetailServices'

const RoomDetailBody = () => {
  //unit services

  const [selectedService, setSelectedService] = useState('')

  //param
  const { apartmentId, id: unitId } = useParams<{ apartmentId: string; id: string }>()
  //fetch current contract
  const { data: currentContract, isLoading } = useRentoraApiContractDetail({
    apartmentId: apartmentId!,
    unitId: unitId!,
  })

  return (
    <>
      <div className="desktop:grid-cols-2 grid gap-2">
        {/* Left Column - Contract Details */}

        {isLoading ? (
          <ContractDetailLoading />
        ) : currentContract ? (
          <ContractDetail data={currentContract} />
        ) : (
          <RoomDetailContract />
        )}

        {/* Right Column - Service Addition */}
        <RoomDetailServices selectedService={selectedService} setSelectedService={setSelectedService} />
      </div>

      <RoomDetailOutStandingContract />
      <RoomDetailReservationList />
    </>
  )
}

export default RoomDetailBody
