import type { ComponentType } from 'react'

import { FieldEmpty } from '@/components/ui'

type IInfoRow = {
  label: string
  value: string | null
  icon?: ComponentType<{ className?: string }>
}
const InfoRow = ({ label, value, icon: Icon }: IInfoRow) => (
  <div className="border-theme-secondary-300 flex items-start gap-3 border-b py-3 last:border-0">
    {Icon && <Icon className="text-theme-secondary-400 mt-0.5 size-4 flex-shrink-0" />}
    <div className="min-w-0 flex-1">
      <p className="text-theme-secondary-500 text-body-3">{label}</p>
      <p className="text-body-2">{value || <FieldEmpty />}</p>
    </div>
  </div>
)

export default InfoRow
