import type { IBaseUseQuery, IRentoraApiClientBaseResponse, Maybe } from '@/types'

export type IUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: Maybe<string>
  profileImageUrl: Maybe<string>
  mustChangePassword: boolean
  lastLogin: string
}

export type IRentoraApiClientUserResponse = IRentoraApiClientBaseResponse<IUser>

//hook
export type IUseRentoraApiClientUserResponse = IBaseUseQuery<IRentoraApiClientUserResponse['data']>
