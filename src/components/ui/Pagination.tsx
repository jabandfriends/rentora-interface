import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

import type { IPaginationButtonProps, IPaginationEllipsisProps, IPaginationNavigationProps } from '@/types'
import { cn } from '@/utilities'

const Pagination = ({ className, ...props }: ComponentProps<'nav'>) => {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('flex', className)}
      {...props}
    />
  )
}

const PaginationContent = ({ className, ...props }: ComponentProps<'ul'>) => {
  return <ul data-slot="pagination-content" className={cn('flex flex-row items-center gap-1', className)} {...props} />
}

const PaginationItem = ({ className, ...props }: ComponentProps<'li'>) => {
  return <li data-slot="pagination-item" className={cn('size-7.5 aspect-square', className)} {...props} />
}

const PaginationButton = ({ className, isActive, isEllipsis = false, disabled, ...props }: IPaginationButtonProps) => {
  return (
    <button
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      disabled={disabled}
      className={cn('text-body-2 border-theme-secondary-300 size-7.5 aspect-square shrink-0 rounded border', [
        isActive && !isEllipsis && !disabled && 'bg-theme-primary text-theme-white',
        !isActive && !isEllipsis && !disabled && 'hover:bg-theme-night-600/40 cursor-pointer',
        disabled && 'text-button-disabled',
        className,
      ])}
      {...props}
    />
  )
}

const PaginationNavigate = ({ className, direction, ...props }: IPaginationNavigationProps) => {
  return (
    <PaginationButton aria-label={`Go to ${direction} page`} className={cn('p-[3px]', className)} {...props}>
      {direction === 'previous' ? (
        <ChevronLeftIcon className="size-6 shrink-0 opacity-90" />
      ) : (
        <ChevronRightIcon className="size-6 shrink-0 opacity-90" />
      )}
    </PaginationButton>
  )
}

const PaginationEllipsis = (props: IPaginationEllipsisProps) => {
  return (
    <PaginationButton data-slot="pagination-ellipsis" isEllipsis {...props}>
      ...
    </PaginationButton>
  )
}

export { Pagination, PaginationButton, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNavigate }
