import { Eye, Image as ImageIcon, User } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Card, Image } from '@/components/common'
import { ROUTES } from '@/constants'
import type { IApartment } from '@/types'
import { formatTimestamp } from '@/utilities'

const ApartmentCard = ({
  id,
  name,
  logoUrl,
  phoneNumber,
  address,
  city,
  state,
  status,
  createdAt,
  updatedAt,
  buildingCount,
  unitCount,
  activeContractCount,
}: IApartment) => {
  const navigate = useNavigate()

  const handleViewApartment = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    navigate(ROUTES.overview.getPath(id))
  }

  const createdAtTime = useMemo(() => formatTimestamp(createdAt, 'YYYY-MM-DD HH:mm:ss', 'Asia/Bangkok'), [createdAt])
  const updatedAtTime = useMemo(() => formatTimestamp(updatedAt, 'YYYY-MM-DD HH:mm:ss', 'Asia/Bangkok'), [updatedAt])
  return (
    <Card className="w-full space-y-1 rounded-xl">
      <div className="flex flex-col justify-between">
        <h4>{name}</h4>
        <div className="desktop:flex-row desktop:items-center flex flex-col justify-between">
          <p className="text-body-2 text-theme-secondary">Created at : {createdAtTime}</p>
          <p className="text-body-2 text-theme-secondary">Last updated at : {updatedAtTime}</p>
        </div>
      </div>
      <div className="desktop:grid-cols-2 grid gap-4">
        <div>
          {logoUrl ? (
            <Image className="h-56 w-full rounded-lg object-cover" src={logoUrl} alt={'Apartment Image of ' + name} />
          ) : (
            <div className="bg-theme-secondary-200/70 flex h-56 w-full flex-col items-center justify-center rounded-lg">
              <ImageIcon size={48} className="text-theme-secondary" />
              <p className="text-body-2 text-theme-secondary">No Image available</p>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between gap-y-2">
          <div className="bg-theme-secondary-200/30 desktop:px-8 grid grid-cols-2 gap-y-2 rounded-xl px-4 py-4">
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
              <h5>Phone Number </h5>
              <p className="text-body-2">{phoneNumber}</p>
            </div>
            <div>
              <h5>Status </h5>
              <p className="text-body-2">{status}</p>
            </div>
            <div>
              <h5> Building Count </h5>
              <p className="text-body-2 flex items-center gap-x-2">
                <User size={16} /> {buildingCount}
              </p>
            </div>
            <div>
              <h5> Unit Count </h5>
              <p className="text-body-2 flex items-center gap-x-2">
                <User size={16} /> {unitCount}
              </p>
            </div>
            <div>
              <h5> Active Contract Count </h5>
              <p className="text-body-2 flex items-center gap-x-2">
                <User size={16} /> {activeContractCount}
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
