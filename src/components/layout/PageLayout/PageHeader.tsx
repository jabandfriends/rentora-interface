import { type ReactNode } from 'react'

import { Button } from '@/components/common'

type IPageHeaderProps = {
  title: string
  description: string
  isAction?: boolean
  actionLabel?: string
  actionIcon?: ReactNode
  actionOnClick?: () => void
}

const PageHeader = ({ title, description, isAction, actionLabel, actionIcon, actionOnClick }: IPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <h2>{title}</h2>
        {isAction && (
          <Button className="flex items-center gap-2" onClick={actionOnClick}>
            {actionIcon}
            {actionLabel}
          </Button>
        )}
      </div>

      <p className="text-theme-secondary">{description}</p>
    </div>
  )
}

export default PageHeader
