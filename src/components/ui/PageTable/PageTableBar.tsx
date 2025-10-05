import { Skeleton } from '@/components/common'

type IPageTableBarProps = {
  title: string
  count: string
  isLoading?: boolean
}
const PageTableBar = ({ title, count, isLoading }: IPageTableBarProps) => {
  return (
    <div className="bg-theme-light flex flex-col items-center rounded-2xl px-4 py-4">
      <h3 className="text-theme-primary">{isLoading ? <Skeleton className="h-6 w-24" /> : count}</h3>
      <p className="text-theme-secondary">{title}</p>
    </div>
  )
}

export default PageTableBar
