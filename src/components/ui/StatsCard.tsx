import { Card, Skeleton } from '@/components/common'
import type { IStatsCardProps } from '@/types'
import { cn } from '@/utilities'

export const StatsCard = ({ title, count, icon, type, className, isLoading }: IStatsCardProps) => {
  return (
    <Card className={cn('rounded-4xl desktop:w-58 border-theme-secondary-300 h-36 w-full border', className)}>
      <div className="space-y-2">
        {isLoading ? <Skeleton className="h-5 w-12" /> : <h3>{count}</h3>}
        {isLoading ? <Skeleton className="h-5 w-32" /> : <p className="text-theme-secondary">{title}</p>}
      </div>

      {icon && (
        <div className="flex items-center justify-end">
          <div
            className={cn('rounded-md p-1', [
              type === 'primary' && 'bg-theme-primary-100 text-theme-primary',
              type === 'success' && 'bg-theme-success-100 text-theme-success',
              type === 'warning' && 'bg-theme-warning-100 text-theme-warning',
              type === 'error' && 'bg-theme-error-100 text-theme-error',
            ])}
          >
            {icon}
          </div>
        </div>
      )}
    </Card>
  )
}
