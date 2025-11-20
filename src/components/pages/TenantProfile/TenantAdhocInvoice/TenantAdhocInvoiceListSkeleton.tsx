import { Card, CardContent, Skeleton } from '@/components/common'

const TenantAdhocInvoiceListSkeleton = () => {
  return (
    <Card className="justify-start space-y-4 rounded-xl shadow">
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <div className="flex items-center justify-between gap-x-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[180px]" />
        </div>
        <div className="desktop:grid-cols-2 grid gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="border-theme-secondary-300 rounded-xl border shadow-none">
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-4 w-full" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-16 w-24" />
                  <Skeleton className="h-16 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  )
}

export default TenantAdhocInvoiceListSkeleton
