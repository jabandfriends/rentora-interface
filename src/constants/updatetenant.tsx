import z from 'zod'

import type { FORM_SECTION, TENANT_FORM_FIELDS_TYPE } from '@/types'

export const TENANT_FORM_SCHEMA = z.object({
  firstname: z.string({ error: 'Firstname is required.' }).optional(),
  lastname: z.string({ error: 'Lastname is required.' }).optional(),
  emial: z.string({ error: 'Emain is required.' }).optional(),
  phone: z.string({ error: 'Phone is required.' }).optional(),
  id: z.string({ error: 'National ID is required.' }).optional(),
  birthdate: z.string({ error: 'birthdate is required.' }).optional(),
  floor: z.string({ error: 'floor is required.' }).optional(),
  room: z.string({ error: 'room is required.' }).optional(),
})

export const TENANT_FORM_FIELDS: Array<FORM_SECTION<TENANT_FORM_FIELDS_TYPE>> = [
  {
    title: 'Tenant Detail',
    description: 'Basic information about tenant.',
    fields: [
      {
        fieldType: 'layout',
        layout: 'row',
        label: 'Scheduling',
        description: '',
        key: 'name',
        fields: [
          {
            key: 'firstname',
            label: 'Firstname',
            description: 'Firstname input field',
            fieldType: 'input',
            placeholder: 'Firstname',
            inputType: 'text',
          },
          {
            key: 'lastname',
            label: 'Lastname',
            description: 'Lastname input field',
            fieldType: 'input',
            placeholder: 'Lastname',
            inputType: 'text',
          },
        ],
      },
      {
        key: 'email',
        label: 'Email',
        description: 'Email input field',
        fieldType: 'input',
        placeholder: 'email@email.com',
        inputType: 'email',
      },
      {
        key: 'phone',
        label: 'Phone',
        description: 'Phone input field',
        fieldType: 'input',
        placeholder: 'XXXXXXXXXX',
        inputType: 'number',
      },
      {
        key: 'id',
        label: 'NationoalID',
        description: 'National ID input field',
        fieldType: 'input',
        placeholder: 'XXXXXXXXXXXXX',
        inputType: 'text',
      },
      {
        key: 'birthdate',
        label: 'Birthdate',
        description: 'Birthdate input field',
        fieldType: 'input',
        placeholder: 'XX-XX-XXXX',
        inputType: 'datetime',
      },
    ],
  },
  {
    title: 'Location',
    description: 'Select the room where this task should be completed',
    fields: [
      {
        key: 'floor',
        label: 'Floor',
        description: 'Floor input field',
        fieldType: 'input',
        placeholder: 'XX',
        inputType: 'number',
      },
      {
        key: 'room',
        label: 'Room',
        description: 'Room input field',
        fieldType: 'input',
        placeholder: 'XXXX',
        inputType: 'number',
      },
    ],
  },
]
