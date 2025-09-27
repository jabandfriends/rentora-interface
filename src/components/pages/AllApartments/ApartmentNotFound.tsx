import { Plus, Search } from 'lucide-react'
import { useCallback } from 'react'
import { type NavigateFunction, useNavigate } from 'react-router-dom'

import { Button } from '@/components/common'
import { ROUTES } from '@/constants'

const ApartmentNotFound = () => {
  const navigate: NavigateFunction = useNavigate()
  const handleCreateApartment = useCallback(() => {
    navigate(ROUTES.apartmentCreate.path)
  }, [navigate])
  return (
    <div className="bg-theme-light h-110 flex flex-col items-center justify-center gap-y-4 rounded-2xl shadow">
      <Search size={56} />
      <div className="desktop:w-1/4 w-2/3 text-center">
        <h3>No apartment to display</h3>
        <p className="text-theme-secondary text-body-2">No apartment found for this search.</p>
      </div>

      <Button className="flex items-center gap-x-2" onClick={handleCreateApartment}>
        <Plus /> Create an Apartment
      </Button>
    </div>
  )
}

export default ApartmentNotFound
