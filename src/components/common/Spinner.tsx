import { cn } from '@/utilities'

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'border-theme-night-600 size-5 animate-spin rounded-full border-4 border-t-transparent',
          className,
        )}
      />
    </div>
  )
}
