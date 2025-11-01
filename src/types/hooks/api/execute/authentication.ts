import type { IBaseUseMutation, IRentoraApiClientBaseResponse, Maybe } from '@/types'

//data
export interface IAuthRequest {
  email: string
  password: string
}

//hooks type useRentoraApiAuthenticate
export type IUseRentoraApiAuthenticate = IBaseUseMutation<IRentoraApiClientAuthenticateResponse['data'], IAuthRequest>

//hooks type useRentoraApiFirstTimeResetPassword
export type IUseRentoraApiFirstTimeResetPassword = IBaseUseMutation<void, IFirsttimePasswordResetRequestPayload>

export type IRentoraApiClientAuthenticateResponse = IRentoraApiClientBaseResponse<{
  accessToken: string
  expireIn: number
  userInfo: {
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: Maybe<string>
    profileImageUrl: Maybe<string>
    mustChangePassword: boolean
    lastLogin: string
    apartmentRoles: Array<{
      apartmentId: string
      apartmentName: string
      role: string
    }>
  }
  tokenType: string
}>

export type IFirsttimePasswordResetRequestPayload = {
  newPassword: string
}

//payload
export type IUpdateUserRequestPayload = Partial<{
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  birthDate: string
  nationalId: string
  emergencyContactName: string
  emergencyContactPhone: string
}>

//hooks type useRentoraApiUpdateUser
export type IUseRentoraApiUpdateUser = IBaseUseMutation<void, IUpdateUserRequestPayload>
