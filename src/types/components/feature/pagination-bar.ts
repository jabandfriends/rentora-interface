import type { IPaginate } from '@/types'

export type IPaginationBarProps = Omit<IPaginate, 'size'> & {
  isLoading?: boolean
  onPageChange: (page: number) => void
}
