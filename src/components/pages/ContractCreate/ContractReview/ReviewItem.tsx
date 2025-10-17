import type { ElementType, ReactNode } from 'react'

import { cn } from '@/utilities'

interface IReviewItemProps {
  icon: ElementType
  label: string
  value: string | number | ReactNode
  highlight?: boolean
}

const ReviewItem = ({ icon: Icon, label, value, highlight }: IReviewItemProps) => (
  <div className="hover:bg-theme-secondary-100 group flex items-start gap-3 rounded-lg p-3 duration-200">
    <div
      className={cn(`mt-0.5 rounded-md p-2`, [
        highlight ? 'bg-theme-primary text-theme-white' : 'bg-theme-secondary-200',
      ])}
    >
      <Icon className="size-4" />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-theme-secondary text-body-2">{label}</p>
      <p className={cn(`mt-0.5 font-semibold capitalize`, [highlight ? 'text-theme-primary' : ''])}>{value}</p>
    </div>
  </div>
)

export default ReviewItem
