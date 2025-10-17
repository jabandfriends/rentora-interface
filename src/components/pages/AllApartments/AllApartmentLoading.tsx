import { ApartmentCardSkeleton } from '@/components/pages/AllApartments'

const AllApartmentLoading = () => {
  return (
    <div className="w-full space-y-4">
      <div className="desktop:grid-cols-2 grid gap-4">
        <ApartmentCardSkeleton />
        <ApartmentCardSkeleton />
        <ApartmentCardSkeleton />
        <ApartmentCardSkeleton />
      </div>
    </div>
  )
}

export default AllApartmentLoading
