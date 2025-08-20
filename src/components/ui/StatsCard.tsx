import type { IStatsCardProps } from '@/types'
import { cn } from '@/utilities'

export const StatsCard = ({ title, count, icon, type, className }: IStatsCardProps) => {
  return (
    <div
      className={cn(
        'bg-theme-light rounded-4xl w-78 duration-400 flex h-40 flex-col justify-center gap-y-2 px-6 hover:shadow-lg',
        className,
      )}
    >
      <h3>{count}</h3>
      <p className="text-theme-secondary">{title}</p>
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
    </div>
  )
}
