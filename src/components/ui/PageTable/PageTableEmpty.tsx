import { PackageOpen } from 'lucide-react'
import type { ReactNode } from 'react'

type IPageTableEmptyProps = {
  message?: string
  description?: string
  icon?: ReactNode
}
const PageTableEmpty = ({
  message = 'No data to show right now.',
  description = 'Everything looks quiet here — try again later or check your filters.',
  icon = <PackageOpen size={50} />,
}: IPageTableEmptyProps) => {
  return (
    <div className="bg-theme-light flex h-60 flex-col items-center justify-center rounded-lg p-5">
      {icon}
      <h4>{message}</h4>
      <p className="text-theme-secondary text-body-2 text-center">{description}</p>
    </div>
  )
}

export default PageTableEmpty
