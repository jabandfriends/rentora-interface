import { type ReactNode } from 'react'

type IPageHeaderProps = {
  title: string
  description: string
  actionButton?: ReactNode
}

const PageHeader = ({ title, description, actionButton }: IPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <h2>{title}</h2>
        {actionButton}
      </div>

      <p className="text-theme-secondary">{description}</p>
    </div>
  )
}

export default PageHeader
