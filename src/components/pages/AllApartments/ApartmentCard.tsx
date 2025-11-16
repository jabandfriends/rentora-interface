import { Building, Eye, FileDown, Image as ImageIcon, Sofa, User, UserCog, Wrench } from 'lucide-react'
import type { MouseEvent, ReactNode } from 'react'
import { useMemo } from 'react'
import { type NavigateFunction, useNavigate } from 'react-router-dom'
import type { VariantProps } from 'tailwind-variants'

import { Button, Card, Image } from '@/components/common'
import { Badge, FieldEmpty } from '@/components/ui'
import { ROUTES } from '@/constants'
import { APARTMENT_STATUS, TENANT_ROLE } from '@/enum'
import type { IApartment, Maybe } from '@/types'
import { formatTimestamp } from '@/utilities'

const ApartmentCard = ({ apartment }: { apartment: IApartment }) => {
  const navigate: NavigateFunction = useNavigate()

  const handleViewApartment = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    navigate(ROUTES.overview.getPath(apartment.id))
  }

  const { isButtonDisabled, buttonText, buttonVariant, buttonIcon } = useMemo(() => {
    let text: string = ''
    let disabled: boolean = false
    let variant: VariantProps<typeof Button>['variant'] = 'primary'
    let icon: Maybe<ReactNode> = <Eye size={16} />

    switch (apartment.status) {
      case APARTMENT_STATUS.ACTIVE:
        text = 'View'
        disabled = false
        variant = 'primary'
        break
      case APARTMENT_STATUS.INACTIVE:
        text = 'Inactive Apartment'
        disabled = true
        variant = 'error'
        icon = null
        break
      case APARTMENT_STATUS.IN_PROGRESS:
      case APARTMENT_STATUS.INCOMPLETE:
        text = 'Continue setup'
        disabled = false
        variant = 'warning'
        icon = <FileDown size={16} />
        break
      default:
        text = 'View'
        disabled = false
        variant = 'primary'
    }

    return { isButtonDisabled: disabled, buttonText: text, buttonVariant: variant, buttonIcon: icon }
  }, [apartment.status])

  const statusBadgeVariant: VariantProps<typeof Badge>['variant'] = useMemo(() => {
    switch (apartment.status) {
      case APARTMENT_STATUS.INCOMPLETE:
        return 'warning'
      case APARTMENT_STATUS.IN_PROGRESS:
        return 'default'
      case APARTMENT_STATUS.ACTIVE:
        return 'success'
      case APARTMENT_STATUS.INACTIVE:
        return 'error'
      default:
        return 'secondary'
    }
  }, [apartment.status])

  const apartmentStatusMessage: string = useMemo(() => {
    switch (apartment.status) {
      case APARTMENT_STATUS.INCOMPLETE:
        return 'Setup Incomplete'
      case APARTMENT_STATUS.IN_PROGRESS:
        return 'Setup In Progress'
      case APARTMENT_STATUS.ACTIVE:
        return 'Active'
      case APARTMENT_STATUS.INACTIVE:
        return 'Inactive'
      default:
        return 'Unknown'
    }
  }, [apartment.status])

  const createdAtTime: string = useMemo(
    () => formatTimestamp(apartment.createdAt, 'DD MMM YYYY', 'Asia/Bangkok'),
    [apartment.createdAt],
  )

  const userRoleBadge: { variant: VariantProps<typeof Badge>['variant']; label: string; icon: ReactNode } =
    useMemo(() => {
      switch (apartment.userRole) {
        case TENANT_ROLE.ADMIN:
          return { variant: 'default', label: 'Admin', icon: <UserCog /> }
        case TENANT_ROLE.TENANT:
          return { variant: 'outline', label: 'Tenant', icon: <User size={16} /> }
        case TENANT_ROLE.MAINTENANCE:
          return { variant: 'warning', label: 'Maintenance', icon: <Wrench size={16} /> }
        case TENANT_ROLE.ACCOUNTING:
          return { variant: 'secondary', label: 'Accounting', icon: <FileDown size={16} /> }
        default:
          return { variant: 'secondary', label: 'N/A', icon: <User size={16} /> }
      }
    }, [apartment.userRole])

  return (
    <Card className="w-full space-y-1 rounded-xl">
      <div className="flex flex-col justify-between">
        <div className="desktop:flex-row flex flex-col justify-between gap-y-1">
          <div>
            <h4>{apartment.name}</h4>
            <p className="text-body-2 text-theme-secondary">{apartment.address || <FieldEmpty />}</p>
          </div>

          <div className="space-x-2">
            <Badge variant={statusBadgeVariant}>{apartmentStatusMessage}</Badge>
            <Badge variant={userRoleBadge.variant}>
              {userRoleBadge.icon} {userRoleBadge.label}
            </Badge>
          </div>
        </div>
      </div>
      <div className="desktop:grid-cols-2 grid gap-4">
        <div className="space-y-2">
          {apartment.logoUrl ? (
            <Image
              className="h-56 w-full rounded-lg object-cover"
              src={apartment.logoPresignedUrl}
              alt={'Apartment Image of ' + apartment.name}
            />
          ) : (
            <div className="bg-theme-secondary-200/70 flex h-56 w-full flex-col items-center justify-center rounded-lg">
              <ImageIcon size={48} className="text-theme-secondary" />
              <p className="text-body-2 text-theme-secondary">No Image available</p>
            </div>
          )}
          <div className="desktop:flex-row desktop:items-center flex flex-col justify-between">
            <p className="text-body-2 text-theme-secondary">Created at : {createdAtTime}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-y-2">
          <div className="bg-theme-secondary-200/30 desktop:px-8 grid grid-cols-2 gap-y-2 rounded-xl px-4 py-4">
            <div>
              <h5>Address </h5>
              <p className="text-body-2">{apartment.address || <FieldEmpty />}</p>
            </div>
            <div>
              <h5>City </h5>
              <p className="text-body-2">{apartment.city || <FieldEmpty />}</p>
            </div>
            <div>
              <h5>State </h5>
              <p className="text-body-2">{apartment.state || <FieldEmpty />}</p>
            </div>
            <div>
              <h5>Phone Number </h5>
              <p className="text-body-2">{apartment.phoneNumber || <FieldEmpty />}</p>
            </div>

            <div>
              <h5> Building Count </h5>
              <p className="text-body-2 flex items-center gap-x-2">
                <Building size={16} /> {apartment.buildingCount}
              </p>
            </div>
            <div>
              <h5> Unit Count </h5>
              <p className="text-body-2 flex items-center gap-x-2">
                <Sofa size={16} /> {apartment.unitCount}
              </p>
            </div>
            <div>
              <h5> Active Contract Count </h5>
              <p className="text-body-2 flex items-center gap-x-2">
                <User size={16} /> {apartment.activeContractCount}
              </p>
            </div>
          </div>

          <Button
            variant={buttonVariant}
            disabled={isButtonDisabled}
            onClick={handleViewApartment}
            className="flex items-center gap-x-2"
            block
          >
            {buttonIcon}
            {buttonText}
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default ApartmentCard
