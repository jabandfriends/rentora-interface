import { Plus, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button, Input } from '@/components/common'
import { AllApartmentEmpty, AllApartmentLoading, ApartmentCard } from '@/components/pages/AllApartments'
import { ROUTES } from '@/constants'
import type { Maybe } from '@/types'

type IAllApartments = {
  data: Maybe<Array<any>>
  loading: boolean
}

const AllApartments = ({ data, loading }: IAllApartments) => {
  const navigate = useNavigate()

  const handleCreateApartment = () => {
    navigate(ROUTES.apartmentCreate.path)
  }

  if (loading) {
    return <AllApartmentLoading />
  }
  if (!data) {
    return <AllApartmentEmpty />
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-x-2">
        <Input className="bg-theme-light" prefix={<Search />} placeholder="Search apartments" />
      </div>
      {data.map((item: any, index: number) => (
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
