import type { ReactNode } from 'react'

import { Card } from '@/components/common'
import { Separator } from '@/components/ui'

interface ISectionCardProps {
  title: string
  description?: string
  children: ReactNode
}
const SectionCard = ({ title, description, children }: ISectionCardProps) => (
  <Card className="hover:shadow-theme-primary-100 border-theme-secondary-300 justify-start overflow-hidden rounded-xl border shadow">
    <div className="pb-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="flex items-center gap-2">{title}</h3>
          {description && <p className="text-body-2 text-theme-secondary mt-1">{description}</p>}
        </div>
      </div>
    </div>
    <Separator />
    <div className="space-y-1 pt-4">{children}</div>
  </Card>
)

export default SectionCard
