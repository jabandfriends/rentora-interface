import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/common'
import {
  AllApartmentEmpty,
  AllApartmentLoading,
  ApartmentCard,
  ApartmentNotFound,
} from '@/components/pages/AllApartments'
import { ROUTES } from '@/constants'
import type { IApartment } from '@/types'

type IAllApartments = {
  data: Array<IApartment>
  isLoading: boolean
  isSearched: boolean
}

const AllApartments = ({ data, isLoading, isSearched }: IAllApartments) => {
  const navigate = useNavigate()

  const handleCreateApartment = () => {
    navigate(ROUTES.apartmentCreate.path)
  }

  if (isLoading) {
    return <AllApartmentLoading />
  }
  if (data.length === 0) {
    if (isSearched) {
      return <ApartmentNotFound />
    }
    return <AllApartmentEmpty />
  }

  return (
    <div className="w-full space-y-4">
      {data.map((item: IApartment, index: number) => (
        <ApartmentCard key={index} {...item} />
      ))}
      <div className="flex justify-end">
        <Button className="flex items-center gap-x-2" onClick={handleCreateApartment}>
          <Plus /> Create an Apartment
        </Button>
      </div>
    </div>
  )
}

export default AllApartments
