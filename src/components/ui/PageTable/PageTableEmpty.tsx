import { PackageOpen } from 'lucide-react'

type IPageTableEmptyProps = {
  message: string
}
const PageTableEmpty = ({ message }: IPageTableEmptyProps) => {
  return (
    <div className="bg-theme-light flex h-1/2 flex-col items-center justify-center rounded-lg p-5">
      <PackageOpen size={50} />
      <p className="text-theme-secondary text-body-1">{message}</p>
    </div>
  )
}

export default PageTableEmpty
