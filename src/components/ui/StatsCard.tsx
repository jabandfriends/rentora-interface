import { Card } from '@/components/common'
import type { IStatsCardProps } from '@/types'
import { cn } from '@/utilities'

export const StatsCard = ({ title, count, icon, type, className }: IStatsCardProps) => {
  return (
    <Card className={cn('rounded-4xl w-78 h-40', className)}>
      <div>
        <h3>{count}</h3>
        <p className="text-theme-secondary">{title}</p>
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
