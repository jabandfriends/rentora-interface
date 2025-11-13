import { Building2, Calendar, Clock, DollarSign, Home, type LucideIcon, Mail, MapPin, Phone, User } from 'lucide-react'
import type { ComponentType, HTMLAttributes } from 'react'

import { FieldEmpty } from '@/components/ui'
import { cn } from '@/utilities'

export type InfoCardIconName =
  | 'mail'
  | 'phone'
  | 'user'
  | 'location'
  | 'building'
  | 'calendar'
  | 'dollar'
  | 'clock'
  | 'home'

type InfoCardProps = HTMLAttributes<HTMLDivElement> & {
  /** Icon name as string or Lucide icon component */
  icon?: InfoCardIconName | ComponentType<{ className?: string }> | LucideIcon
  /** Label text displayed above the value */
  label: string
  /** Main value to display. If null/undefined, shows FieldEmpty */
  value?: string | null
  /** Background color class for icon container */
  iconBgColor?: string
  /** Text color class for icon */
  iconColor?: string
  /** Show icon background container */
  showIconBg?: boolean
}

const iconMap: Record<InfoCardIconName, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  user: User,
  location: MapPin,
  building: Building2,
  calendar: Calendar,
  dollar: DollarSign,
  clock: Clock,
  home: Home,
}

const InfoCard = ({
  icon,
  label,
  value,
  iconBgColor = 'bg-theme-secondary-300',
  iconColor = 'text-theme-secondary-800',
  showIconBg = true,
  className,
  ...props
}: InfoCardProps) => {
  // Resolve icon component
  const IconComponent = typeof icon === 'string' ? iconMap[icon] : icon || null

  return (
    <div
      className={cn(
        'border-theme-secondary-300 bg-theme-light flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-gray-50',
        className,
      )}
      {...props}
    >
      {IconComponent && (
        <div
          className={cn(
            'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg',
            showIconBg && iconBgColor,
          )}
        >
          <IconComponent className={cn('h-5 w-5', showIconBg && iconColor)} />
        </div>
      )}

      <div className="min-w-0 flex-1 overflow-hidden">
        <p className="text-theme-secondary-500 text-body-2 mb-0.5">{label}</p>
        <p className="text-body-2 truncate font-medium">{value ?? <FieldEmpty />}</p>
      </div>
    </div>
  )
}

export default InfoCard
