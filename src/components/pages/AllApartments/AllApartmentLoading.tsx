import { ApartmentCardSkeleton } from '@/components/pages/AllApartments'

const AllApartmentLoading = () => {
  return (
    <div className="w-full space-y-4">
      <ApartmentCardSkeleton />
      <ApartmentCardSkeleton />
    </div>
  )
}

export default AllApartmentLoading
