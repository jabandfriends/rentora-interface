import { Card, CardContent, CardHeader, Skeleton } from '@/components/common'
import { Separator } from '@/components/ui'

const TenantPaymentSkeletonCard = () => {
  return (
    <>
      <Card className="border-theme-secondary-300 rounded-xl border shadow-none hover:shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex w-full flex-col gap-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
            </div>
            <div className="flex items-center gap-x-2">
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-4">
          {/* verified status */}
          <div className="flex w-full items-center gap-x-2">
            <Skeleton className="h-6 w-1/2" />
          </div>
          <div className="desktop:flex-row desktop:items-center flex flex-col justify-between gap-y-2">
            <Skeleton className="h-6 w-3/4" />

            <Skeleton className="desktop:w-24 h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default TenantPaymentSkeletonCard
