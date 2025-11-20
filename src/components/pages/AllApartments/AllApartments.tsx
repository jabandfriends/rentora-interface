import { PaginationBar } from '@/components/feature'
import {
  AllApartmentEmpty,
  AllApartmentLoading,
  ApartmentCard,
  ApartmentNotFound,
} from '@/components/pages/AllApartments'
import type { IApartment } from '@/types'

type IAllApartments = {
  data: Array<IApartment>
  isLoading: boolean
  isSearched: boolean
  currentPage: number
  totalPages: number
  totalElements: number
  onPageChange: (page: number) => void
}

const AllApartments = ({
  data,
  isLoading,
  isSearched,
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
}: IAllApartments) => {
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
      <div className="desktop:grid-cols-2 grid gap-4">
        {data.map((apartment: IApartment, index: number) => (
          <ApartmentCard key={apartment.id + index} apartment={apartment} />
        ))}
      </div>

      <div className="flex justify-end">
        <PaginationBar
          isLoading={isLoading}
          page={currentPage}
          totalElements={totalElements}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}

export default AllApartments
