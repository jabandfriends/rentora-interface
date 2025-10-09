import type { ComponentType, ReactNode } from 'react'

type ISection = {
  title: string
  children: ReactNode
  icon?: ComponentType<{ className?: string }>
}
const Section = ({ title, children, icon: Icon }: ISection) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="text-theme-primary size-5" />}
      <h4 className="text-theme-primary">{title}</h4>
    </div>
    <div className="border-theme-secondary-300 divide-y divide-gray-100 rounded-lg border">{children}</div>
  </div>
)

export default Section
