import { type Dispatch, type SetStateAction, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { ContractDeleteModal, ContractDetail } from '@/components/pages/RoomDetail/ContractDetail'
import { useRentoraApiContractDetail, useRentoraApiContractTerminate } from '@/hooks'
import type { TerminationFormValues } from '@/types'
import { getErrorMessage } from '@/utilities'

import RoomDetailExpiredContract from './RoomDetailExpiredContract'
import RoomDetailMaintenanceList from './RoomDetailMaintenanceList'
import RoomDetailOutStandingContract from './RoomDetailOutStandingContract'
import RoomDetailServices from './RoomDetailServices'

const RoomDetailBody = () => {
  //unit services
  const [services, setServices] = useState([
    { id: 1, name: 'Common Area Maintenance', price: 50 },
    { id: 2, name: 'Parking Space', price: 100 },
  ])

  const [selectedService, setSelectedService] = useState('')
  const [isOpenDeleteModal, setOpenDeleteModal]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false)

  const handleOpenModal = useCallback(() => {
    setOpenDeleteModal(true)
  }, [])
  //param
  const { apartmentId, id: unitId } = useParams<{ apartmentId: string; id: string }>()
  //fetch current contract
  const { data: currentContract, isLoading } = useRentoraApiContractDetail({
    apartmentId: apartmentId!,
    unitId: unitId!,
  })

  const { mutateAsync: terminateContract } = useRentoraApiContractTerminate({
    apartmentId: apartmentId!,
    unitId: unitId!,
  })

  //api
  const addService = () => {
    if (selectedService) {
      setServices((prevServices) => [...prevServices, { id: prevServices.length + 1, name: selectedService, price: 0 }])
      setSelectedService('')
    }
  }

  //api
  const removeService = (id: number) => {
    setServices((prevServices) => prevServices.filter((service) => service.id !== id))
  }

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

  return (
    <>
      <ContractDeleteModal
        isOpenDeleteModal={isOpenDeleteModal}
        handleOpenModal={setOpenDeleteModal}
        handleSubmit={handleSubmit}
      />
      <div className="desktop:grid-cols-2 grid gap-2">
        {/* Left Column - Contract Details */}

        <ContractDetail handleOpenDeleteModal={handleOpenModal} data={currentContract} isLoading={isLoading} />

        {/* Right Column - Service Addition */}
        <RoomDetailServices
          services={services}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          addService={addService}
          removeService={removeService}
        />
      </div>

      <RoomDetailOutStandingContract />
      <RoomDetailExpiredContract />
      <RoomDetailMaintenanceList />
    </>
  )
}

export default RoomDetailBody
