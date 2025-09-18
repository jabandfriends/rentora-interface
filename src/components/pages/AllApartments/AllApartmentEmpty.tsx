import { PackageOpen, Plus } from 'lucide-react'
import { useCallback } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/common'
import { ROUTES } from '@/constants'

const AllApartmentEmpty = () => {
  const navigate: NavigateFunction = useNavigate()
  const handleCreateApartment = useCallback(() => {
    navigate(ROUTES.apartmentCreate.path)
  }, [navigate])
  return (
    <div className="h-110 flex flex-col items-center justify-center gap-y-4">
      <PackageOpen size={56} />
      <div className="desktop:w-1/4 w-2/3 text-center">
        <h3>No apartment to display</h3>
        <p className="text-theme-secondary text-body-2">
          Looks like you haven’t created any apartment yet, click on the button to add the first one.
        </p>
      </div>

      <Button className="flex items-center gap-x-2" onClick={handleCreateApartment}>
        <Plus /> Create an Apartment
      </Button>
    </div>
  )
}

export default AllApartmentEmpty
