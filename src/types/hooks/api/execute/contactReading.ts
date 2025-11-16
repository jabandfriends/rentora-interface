import type { IBaseUseMutation } from '@/types'

export type IReadingContact = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  nationId: string
  dateOfBirth: string
  emergencyContactName: string
  emergencyContactPhone: string
}

export type IUseRentoraApiCreateReadingContact = IBaseUseMutation<IReadingContact, File>
