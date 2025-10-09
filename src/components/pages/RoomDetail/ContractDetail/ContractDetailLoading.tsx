import { Building, User } from 'lucide-react'

import { Card, Skeleton } from '@/components/common'

import Section from './Section'

const ContractDetailLoading = () => {
  return (
    <Card className="justify-start rounded-2xl shadow">
      {/* Header */}
      <div className="border-theme-secondary-300 space-y-6 rounded-lg border p-6 shadow-sm">
        <div className="desktop:flex-row flex flex-col items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      <div className="desktop:grid-cols-2 grid gap-2">
        {/* Property Information */}
        <Section title="Property Information" icon={Building}>
          <div className="space-y-4 p-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </Section>

        {/* Tenant Information */}
        <Section title="Tenant Information" icon={User}>
          <div className="space-y-4 p-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </Section>
      </div>
      <div className="flex items-center justify-end">
        <Skeleton className="h-10 w-32" />
      </div>
    </Card>
  )
}

export default ContractDetailLoading
