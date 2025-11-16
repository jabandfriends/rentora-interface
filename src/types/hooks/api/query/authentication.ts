import type { TENANT_ROLE } from '@/enum'
import type { IBaseUseQuery, IRentoraApiClientBaseResponse, Maybe } from '@/types'

export type IUserAuthenticationResponse = {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: Maybe<string>
  profileImageUrl: Maybe<string>
  mustChangePassword: boolean
  lastLogin: string
  apartmentRoles: Array<IUserAuthenticationApartmentRole>
}

export type IUserAuthenticationApartmentRole = {
  apartmentId: string
  apartmentName: string
  role: TENANT_ROLE
}

export type IRentoraApiClientUserResponse = IRentoraApiClientBaseResponse<IUserAuthenticationResponse>

//hook
export type IUseRentoraApiClientUserResponse = IBaseUseQuery<IRentoraApiClientUserResponse['data']>
