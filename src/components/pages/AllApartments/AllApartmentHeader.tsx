import { Building, Building2 } from 'lucide-react'
import { useMemo } from 'react'

import { StatsCard } from '@/components/ui'
import type { IApartmentListMetadata, IStatsCardProps } from '@/types'

type IAllApartmentHeaderProps = IApartmentListMetadata & { isLoading: boolean }
const AllApartmentHeader = ({ totalApartments, totalActiveApartments, isLoading }: IAllApartmentHeaderProps) => {
  const stats: Array<IStatsCardProps> = useMemo(
    () => [
      { title: 'Total Apartments', count: totalApartments, icon: <Building2 />, type: 'primary' },
      {
        title: 'Total Active Apartments',
        count: totalActiveApartments,
        icon: <Building className="text-theme-success" />,
        type: 'success',
      },
      {
        title: 'Total Inactive Apartments',
        count: totalApartments - totalActiveApartments,
        icon: <Building className="text-theme-error" />,
        type: 'error',
      },
    ],
    [totalApartments, totalActiveApartments],
  )
  return (
    <div className="desktop:flex desktop:justify-start grid grid-cols-2 items-center justify-center gap-4">
      {stats.map((stat, index) => (
        <StatsCard
          key={`stat-${index}`}
          isLoading={isLoading}
          title={stat.title}
          count={stat.count}
          icon={stat.icon}
          type={stat.type}
        />
      ))}
    </div>
  )
}

export default AllApartmentHeader
