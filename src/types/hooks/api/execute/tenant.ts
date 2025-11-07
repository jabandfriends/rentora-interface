import type { TENANT_ROLE } from '@/enum'
import type { IBaseUseMutation } from '@/types'

type ITenantExecuteBasePayload = {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNumber: string
  birthDate: string
  nationalId: string
  emergencyContactName: string
  emergencyContactPhone: string
  role: TENANT_ROLE
}
//hooks type useRentoraApiTenantCreate
export type IUseRentoraApiTenantCreate = IBaseUseMutation<void, ICreateTenantRequestPayload>

//hooks type useRentoraApiTenantUpdate
export type IUseRentoraApiTenantUpdate = IBaseUseMutation<void, IUpdateTenantRequestPayload>

//hooks type useRentoraApiTenantUpdatePassword
export type IUseRentoraApiTenantUpdatePassword = IBaseUseMutation<void, IUpdateTenantPasswordRequestPayload>

//create
export type ICreateTenantRequestPayload = ITenantExecuteBasePayload
//update
export type IUpdateTenantRequestPayload = Partial<Omit<ITenantExecuteBasePayload, 'password'>>
//update password
export type IUpdateTenantPasswordRequestPayload = {
  newPassword: string
}
