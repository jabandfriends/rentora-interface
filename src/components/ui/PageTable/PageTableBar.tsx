import { Skeleton } from '@/components/common'

type IPageTableBarProps = {
  title: string
  count: string
  isLoading?: boolean
}
const PageTableBar = ({ title, count, isLoading }: IPageTableBarProps) => {
  return (
    <div className="bg-theme-light border-theme-secondary-300 flex flex-col items-center rounded-2xl border px-4 py-4 duration-300 hover:shadow-lg">
      <h3 className="text-theme-primary">{isLoading ? <Skeleton className="h-6 w-24" /> : count}</h3>
      <p className="text-theme-secondary">{title}</p>
    </div>
  )
}

export default PageTableBar
