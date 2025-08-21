type IPageTableBarProps = {
  title: string
  count: string
}
const PageTableBar = ({ title, count }: IPageTableBarProps) => {
  return (
    <div className="bg-theme-light flex flex-col items-center rounded-2xl px-4 py-4">
      <h3 className="text-theme-primary">{count}</h3>
      <p className="text-theme-secondary">{title}</p>
    </div>
  )
}

export default PageTableBar
