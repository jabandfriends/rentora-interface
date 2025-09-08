import { Eye, User } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Card, Image } from '@/components/common'
import { ROUTES } from '@/constants'

type IApartmentCard = {
  id: string
  apartmentName: string
  imageUrl: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  tenants: string
}
const ApartmentCard = ({
  apartmentName,
  imageUrl,
  address,
  city,
  state,
  postalCode,
  country,
  tenants,
}: IApartmentCard) => {
  const navigate = useNavigate()

  const handleViewApartment = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    navigate(ROUTES.overview.path)
  }
  return (
    <Card className="w-full rounded-xl">
      <h4>{apartmentName}</h4>
      <div className="desktop:grid-cols-2 grid gap-4">
        <div>
          <Image
            className="w-144 h-56 rounded-lg object-cover"
            src={imageUrl}
            alt={'Apartment Image of ' + apartmentName}
          />
        </div>
        <div className="flex flex-col justify-between gap-y-2">
          <div className="bg-theme-secondary-200/40 grid grid-cols-2 gap-y-2 rounded-sm p-2">
            <div>
              <h5>Address </h5>
              <p className="text-body-2">{address}</p>
            </div>
            <div>
              <h5>City </h5>
              <p className="text-body-2">{city}</p>
            </div>
            <div>
              <h5>State </h5>
              <p className="text-body-2">{state}</p>
            </div>
            <div>
              <h5>Postal Code </h5>
              <p className="text-body-2">{postalCode}</p>
            </div>
            <div>
              <h5>Country </h5>
              <p className="text-body-2">{country}</p>
            </div>
            <div>
              <h5>Tenants </h5>
              <p className="text-body-2 flex items-center gap-x-2">
                <User size={16} /> {tenants}
              </p>
            </div>
          </div>

          <Button onClick={handleViewApartment} className="flex items-center gap-x-2" block>
            <Eye size={16} />
            View
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ApartmentCard
