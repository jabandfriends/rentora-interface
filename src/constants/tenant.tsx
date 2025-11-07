import { CircleAlert, CircleCheckBig, DollarSign } from 'lucide-react'
import z from 'zod'

import { TENANT_ROLE } from '@/enum'
import type {
  CREATE_TENANT_FORM_FIELDS_TYPE,
  CREATE_TENANT_FORM_SCHEMA_TYPE,
  FORM_SECTION,
  IStatsCardProps,
  UPDATE_TENANT_FORM_FIELDS_PASSWORD_UPDATE_TYPE_BASE,
  UPDATE_TENANT_FORM_FIELDS_TYPE,
} from '@/types'

export const CREATE_TENANT_FORM_SCHEMA = z
  .object({
    firstName: z
      .string({ error: 'First name is required.' })
      .min(1, 'First name is required.')
      .max(50, 'First name must be at most 50 characters long.'),
    lastName: z
      .string({ error: 'Last name is required.' })
      .min(1, 'Last name is required.')
      .max(50, 'Last name must be at most 50 characters long.'),
    email: z
      .email({ error: 'Please enter a valid email address.' })
      .min(1, 'Email is required.')
      .max(100, 'Email must be at most 100 characters long.'),
    password: z
      .string({ error: 'Password is required.' })
      .min(8, 'Password must be at least 8 characters long.')
      .max(100, 'Password must be at most 100 characters long.'),
    confirmPassword: z
      .string({ error: 'Confirm password is required.' })
      .min(8, 'Confirm password must be at least 8 characters long.')
      .max(100, 'Confirm password must be at most 100 characters long.'),
    phoneNumber: z
      .string({ error: 'Phone number is required.' })
      .min(1, 'Phone number is required.')
      .max(10, 'Phone number must be at most 10 characters long.'),
    nationalId: z
      .string({ error: 'National ID is required.' })
      .max(13, 'National ID must be at most 13 characters long.')
      .optional()
      .nullable(),
    dateOfBirth: z.string().optional().nullable(),
    emergencyContactName: z
      .string()
      .max(50, 'Emergency contact name must be at most 50 characters long.')
      .optional()
      .nullable(),

    emergencyContactPhone: z
      .string()
      .max(10, 'Emergency contact phone must be at most 10 characters long.')
      .optional()
      .nullable(),
    role: z.enum(TENANT_ROLE, {
      error: 'Role is required.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Please enter the same password.',
    path: ['confirmPassword'],
  })
export const CREATE_TENANT_DEFAULT_VALUES: CREATE_TENANT_FORM_SCHEMA_TYPE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  nationalId: '',
  dateOfBirth: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  role: TENANT_ROLE.TENANT,
}
export const UPDATE_TENANT_FORM_SCHEMA = z.object({
  firstName: z.string().max(50, 'First name must be at most 50 characters long.').optional().nullable(),
  lastName: z.string().max(50, 'Last name must be at most 50 characters long.').optional().nullable(),
  email: z.string().max(100, 'Email must be at most 100 characters long.').optional().nullable(),
  phoneNumber: z.string().max(10, 'Phone number must be at most 10 characters long.').optional().nullable(),
  nationalId: z.string().max(13, 'National ID must be at most 13 characters long.').optional().nullable(),
  dateOfBirth: z.string().optional().nullable(),
  emergencyContactName: z
    .string()
    .max(50, 'Emergency contact name must be at most 50 characters long.')
    .optional()
    .nullable(),
  emergencyContactPhone: z
    .string()
    .max(10, 'Emergency contact phone must be at most 10 characters long.')
    .optional()
    .nullable(),
})

export const TENANT_PASSWORD_UPDATE_SCHEMA = z
  .object({
    password: z.string({ error: 'Password is required.' }).min(8, 'Password must be at least 8 characters long.'),
    confirmPassword: z.string({ error: 'Confirm password is required.' }).min(8, 'Confirm password is required.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Please enter the same password.',
    path: ['confirmPassword'],
  })

export const UPDATE_TENANT_FORM_FIELDS: Array<FORM_SECTION<UPDATE_TENANT_FORM_FIELDS_TYPE>> = [
  {
    title: 'Tenant Detail',
    description: 'Basic information about tenant',
    fields: [
      {
        fieldType: 'layout',
        layout: 'row',
        key: 'firstName',
        fields: [
          {
            key: 'firstName',
            label: 'First Name',
            placeholder: 'Enter first name',
            fieldType: 'input',
            inputType: 'text',
            maxLength: 50,
          },
          {
            key: 'lastName',
            label: 'Last Name',
            placeholder: 'Enter last name',
            fieldType: 'input',
            inputType: 'text',
            maxLength: 50,
          },
        ],
      },
      {
        key: 'email',
        label: 'Email',
        placeholder: 'Enter email',
        fieldType: 'input',
        maxLength: 100,
      },
      {
        key: 'phoneNumber',
        label: 'Phone Number',
        placeholder: 'Enter phone number',
        fieldType: 'input',
        inputType: 'number',
        maxLength: 10,
      },

      {
        key: 'nationalId',
        label: 'National ID',
        placeholder: 'Enter national ID',
        fieldType: 'input',
        inputType: 'number',
        maxLength: 13,
      },
      {
        key: 'dateOfBirth',
        label: 'Date of Birth',
        fieldType: 'input',
        inputType: 'date',
      },
      {
        key: 'emergencyContactName',
        label: 'Emergency Contact Name',
        fieldType: 'layout',
        layout: 'row',
        fields: [
          {
            key: 'emergencyContactName',
            label: 'Emergency Contact Name',
            placeholder: 'Enter emergency contact name',
            fieldType: 'input',
            inputType: 'text',
            maxLength: 100,
          },
          {
            key: 'emergencyContactPhone',
            label: 'Emergency Contact Phone',
            placeholder: 'Enter emergency contact phone',
            fieldType: 'input',
            inputType: 'number',
            maxLength: 10,
          },
        ],
      },
    ],
  },
]

export const CREATE_TENANT_FORM_FIELDS: Array<FORM_SECTION<CREATE_TENANT_FORM_FIELDS_TYPE>> = [
  {
    title: 'Tenant Detail',
    description: 'Basic information about tenant',
    fields: [
      {
        fieldType: 'layout',
        layout: 'row',
        key: 'firstName',
        fields: [
          {
            key: 'firstName',
            label: 'First Name',
            placeholder: 'Enter first name',
            fieldType: 'input',
            inputType: 'text',
            maxLength: 50,
          },
          {
            key: 'lastName',
            label: 'Last Name',
            placeholder: 'Enter last name',
            fieldType: 'input',
            inputType: 'text',
            maxLength: 50,
          },
        ],
      },
      {
        fieldType: 'layout',
        layout: 'row',
        key: 'password',
        fields: [
          {
            key: 'password',
            label: 'Password',
            placeholder: 'Enter password',
            fieldType: 'input',
            inputType: 'text',
            type: 'password',
            maxLength: 50,
          },
          {
            key: 'confirmPassword',
            label: 'Confirm Password',
            placeholder: 'Enter confirm password',
            fieldType: 'input',
            inputType: 'text',
            type: 'password',
            maxLength: 50,
          },
        ],
      },
      {
        key: 'email',
        label: 'Email',
        placeholder: 'Enter email',
        fieldType: 'input',
        maxLength: 100,
      },
      {
        key: 'role',
        label: 'Role',
        fieldType: 'select',
        options: [
          {
            label: 'Tenant',
            value: TENANT_ROLE.TENANT,
          },
          {
            label: 'Admin',
            value: TENANT_ROLE.ADMIN,
          },
          {
            label: 'Maintenance',
            value: TENANT_ROLE.MAINTENANCE,
          },
          {
            label: 'Accountant',
            value: TENANT_ROLE.ACCOUNTING,
          },
        ],
      },
      {
        key: 'phoneNumber',
        label: 'Phone Number',
        placeholder: 'Enter phone number',
        fieldType: 'input',
        inputType: 'number',
        maxLength: 10,
      },

      {
        key: 'nationalId',
        label: 'National ID',
        placeholder: 'Enter national ID',
        fieldType: 'input',
        inputType: 'number',
        maxLength: 13,
      },
      {
        key: 'dateOfBirth',
        label: 'Date of Birth',
        fieldType: 'input',
        inputType: 'date',
      },
      {
        key: 'emergencyContactName',
        label: 'Emergency Contact Name',
        fieldType: 'layout',
        layout: 'row',
        fields: [
          {
            key: 'emergencyContactName',
            label: 'Emergency Contact Name',
            placeholder: 'Enter emergency contact name',
            fieldType: 'input',
            inputType: 'text',
            maxLength: 100,
          },
          {
            key: 'emergencyContactPhone',
            label: 'Emergency Contact Phone',
            placeholder: 'Enter emergency contact phone',
            fieldType: 'input',
            inputType: 'number',
            maxLength: 10,
          },
        ],
      },
    ],
  },
]

export const TENANT_STATS: Array<IStatsCardProps> = [
  {
    title: 'Total Tenant',
    count: 5,
    type: 'primary',
    icon: <DollarSign size={22} />,
  },
  {
    title: 'Occupied Tenants',
    count: 2,
    type: 'success',
    icon: <CircleCheckBig size={22} />,
  },
  {
    title: 'Unoccupied Tenants',
    count: 2,
    type: 'warning',
    icon: <CircleAlert size={22} />,
  },
]
export const TENANT_DATA = [
  {
    tenantsid: 'TENANT-001',
    name: 'Andre Onana',
    email: 'ThegoatOnana@gmail.com',
    floor: '1',
    unit: '102',
    createdate: '30/08/2024',
    status: 'Occupied',
  },
  {
    tenantsid: 'TENANT-002',
    name: 'Jadon Sancho',
    email: 'ThefreedomSancho@gmail.com',
    floor: '-',
    unit: '-',
    createdate: '30/08/2024',
    status: 'Occupied',
  },
]

export const TENANT_TABLE_HEADER = [
  'TENANT ID',
  'Full Name',
  'Email Address',
  'Floor',
  'Unit',
  'Created Date',
  'Status',
  'Action',
]

export const TENANT_PASSWORD_UPDATE_FORM: Array<FORM_SECTION<UPDATE_TENANT_FORM_FIELDS_PASSWORD_UPDATE_TYPE_BASE>> = [
  {
    title: 'Tenant Password Update',
    description: 'Update tenant password',
    fields: [
      {
        fieldType: 'input',
        key: 'password',
        label: 'New Password',
        placeholder: 'Enter the password',
      },
      {
        fieldType: 'input',
        key: 'confirmPassword',
        label: 'Confirm Password',
        placeholder: 'Confirm the Password',
      },
    ],
  },
]

export enum TENANT_STATUS {
  Active = 'active',
  Inactive = 'inactive',
}
