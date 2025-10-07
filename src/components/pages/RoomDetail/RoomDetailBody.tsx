import { useState } from 'react'

import RoomDetailContract from './RoomDetailContract'
import RoomDetailOutStandingContract from './RoomDetailOutStandingContract'
import RoomDetailReservationList from './RoomDetailReservationList'
import RoomDetailServices from './RoomDetailServices'

const RoomDetailBody = () => {
  //unit services
  const [services, setServices] = useState([
    { id: 1, name: 'Common Area Maintenance', price: 50 },
    { id: 2, name: 'Parking Space', price: 100 },
  ])

  const [selectedService, setSelectedService] = useState('')

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

  return (
    <>
      <div className="desktop:grid-cols-2 grid gap-2">
        {/* Left Column - Contract Details */}
        <RoomDetailContract />

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
      <RoomDetailReservationList />
    </>
  )
}

export default RoomDetailBody
