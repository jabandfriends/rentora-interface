import { Search } from 'lucide-react'
import type { ReactNode } from 'react'

type IPageTableSearchEmptyProps = {
  message: string
  subMessage: string
  icon?: ReactNode
}
const PageTableSearchEmpty = ({ message, subMessage, icon = <Search size={56} /> }: IPageTableSearchEmptyProps) => {
  return (
    <div className="bg-theme-light h-110 flex flex-col items-center justify-center gap-y-4 rounded-2xl shadow">
      {icon}
      <div className="desktop:w-1/4 w-2/3 text-center">
        <h4>{message}</h4>
        <p className="text-theme-secondary text-body-2">{subMessage}</p>
      </div>
    </div>
  )
}

export default PageTableSearchEmpty
