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
  // const [setServices] = useState([
  //   { id: 1, name: 'Common Area Maintenance', price: 50 },
  //   { id: 2, name: 'Parking Space', price: 100 },
  // ])

  const [selectedService, setSelectedService] = useState('')

  //param
  const { apartmentId, id: unitId } = useParams<{ apartmentId: string; id: string }>()
  //fetch current contract
  const { data: currentContract, isLoading } = useRentoraApiContractDetail({
    apartmentId: apartmentId!,
    unitId: unitId!,
  })

  // const addService = () => {
  //   if (selectedService) {
  //     setServices((prev) => [...prev, { id: prev.length + 1, name: selectedService, price: 0 }])
  //     setSelectedService('')
  //   }
  // }

  // const removeService = (id: number) => {
  //   setServices((prev) => prev.filter((s) => s.id !== id))
  // }

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
        <RoomDetailServices
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        // addService={addService}
        // removeService={removeService}
        />
      </div>

      <RoomDetailOutStandingContract />
      <RoomDetailReservationList />
    </>
  )
}

export default RoomDetailBody
