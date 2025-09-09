import { PackageOpen, Plus } from 'lucide-react'

import { Button } from '@/components/common'

const AllApartmentEmpty = () => {
  return (
    <div className="h-110 flex flex-col items-center justify-center gap-y-4">
      <PackageOpen size={56} />
      <div className="desktop:w-1/4 w-2/3 text-center">
        <h3>No apartment to display</h3>
        <p className="text-theme-secondary text-body-2">
          Looks like you haven’t created any apartment yet, click on the button to add the first one.
        </p>
      </div>

      <Button className="flex items-center gap-x-2">
        <Plus /> Create an Apartment
      </Button>
    </div>
  )
}

export default AllApartmentEmpty
