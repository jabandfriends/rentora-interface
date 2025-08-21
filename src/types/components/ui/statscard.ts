import type { ReactNode } from 'react'

export type IStatsCardProps = {
  title: string
  count: number | string
  icon: ReactNode
  type?: 'primary' | 'success' | 'warning' | 'error'
  className?: string
}
