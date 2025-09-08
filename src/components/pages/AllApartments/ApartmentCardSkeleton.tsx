import { Card, Skeleton } from '@/components/common'

const ApartmentCardSkeleton = () => {
  return (
    <Card className="w-full rounded-xl">
      <h4>
        <Skeleton className="w-1/3" />
      </h4>
      <div className="desktop:grid-cols-2 grid gap-4">
        <div>
          <Skeleton className="desktop:w-144 h-56" />
        </div>
        <div className="flex flex-col justify-between gap-y-2">
          <div className="flex flex-col gap-y-2">
            <div className="flex">
              <Skeleton />
            </div>
            <div className="flex">
              <Skeleton />
            </div>
            <div className="flex">
              <Skeleton />
            </div>
            <div className="flex">
              <Skeleton />
            </div>
            <div className="flex">
              <Skeleton />
            </div>
          </div>

          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </Card>
  )
}

export default ApartmentCardSkeleton
