import { CircleCheckBig, Clock, ScrollText } from 'lucide-react'
import { z } from 'zod'

import { MAINTENANCE_CATEGORY, MAINTENANCE_PRIORITY, MAINTENANCE_STATUS } from '@/enum'
import type { FORM_SECTION, IStatsCardProps, MAINTENANCE_FORM_FIELDS_TYPE } from '@/types'

export const MAINTENANCE_STATS: Array<IStatsCardProps> = [
  {
    title: 'Total Reports',
    count: 10,
    icon: <ScrollText size={22} />,
    type: 'primary',
  },
  {
    title: 'Done',
    count: 6,
    icon: <CircleCheckBig size={22} />,
    type: 'success',
  },
  {
    title: 'Unpaid',
    count: 4,
    icon: <Clock size={22} />,
    type: 'warning',
  },
]

export const MAINTENANCE_TABLE_HEADER = [
  'Ticket Number',
  'Service Request Reason',
  'Room',
  'Buildings',
  'Appointment Date',
  'Due Date',
  'Priority',
  'Status',
  'Recurring',
  'Recurring Schedule',
  'Action',
]

export const MAINTENANCE_FORM_SCHEMA = z
  .object({
    unitId: z.string({ error: 'Room number is required.' }).min(1, 'Room number is required.'),
    title: z.string({ error: 'Task title is required.' }).min(1, 'Task title is required.'),
    description: z.string().optional(),
    status: z.enum(
      [
        MAINTENANCE_STATUS.COMPLETED,
        MAINTENANCE_STATUS.PENDING,
        MAINTENANCE_STATUS.ASSIGNED,
        MAINTENANCE_STATUS.IN_PROGRESS,
        MAINTENANCE_STATUS.CANCELLED,
      ],
      { error: 'Status is required' },
    ),
    priority: z.enum(
      [MAINTENANCE_PRIORITY.LOW, MAINTENANCE_PRIORITY.NORMAL, MAINTENANCE_PRIORITY.HIGH, MAINTENANCE_PRIORITY.URGENT],
      { error: 'Priority is required' },
    ),
    appointmentDate: z.string({ error: 'Appointment date is required.' }).min(1, 'Appointment date is required.'),
    recurringSchedule: z.string(),
    dueDate: z.string({ error: 'Due date is wrong format.' }).optional(),
    category: z.enum([MAINTENANCE_CATEGORY.GENERAL, MAINTENANCE_CATEGORY.PLUMBING, MAINTENANCE_CATEGORY.ELECTRICITY], {
      error: 'Category is required',
    }),
    isEmergency: z.boolean(),
    isRecurring: z.boolean(),
    estimatedHours: z.string().optional(),
    estimatedCost: z.string().optional(),
    suppliesUsage: z
      .array(
        z.object({
          maintenanceSupplyId: z.string().optional(),
          supplyId: z.string(),
          supplyUsedQuantity: z.number(),
        }),
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (data.isRecurring) {
        return data.recurringSchedule && data.recurringSchedule.trim() !== ''
      }
      return true
    },
    {
      message: 'Recurring schedule is required when recurring is enabled.',
      path: ['recurringSchedule'],
    },
  )

export const MAINTENANCE_FORM_FIELDS: Array<FORM_SECTION<MAINTENANCE_FORM_FIELDS_TYPE>> = [
  {
    title: 'Task Detail',
    description: 'Basic information about the maintenance task',
    fields: [
      {
        key: 'title',
        label: 'Title',
        description: 'Basic information about the maintenance task',
        fieldType: 'input',
        placeholder: 'Enter task title',
        maxLength: 100,
        isRequired: true,
      },
      {
        key: 'description',
        label: 'Description',
        description: 'Basic information about the maintenance task',
        fieldType: 'input',
        inputType: 'textarea',
        placeholder: 'Enter task description',
        maxLength: 200,
      },
      {
        key: 'priority',
        label: 'Priority',
        description: 'Basic information about the maintenance task',
        fieldType: 'select',
        isRequired: true,
        options: [
          { value: MAINTENANCE_PRIORITY.LOW, label: MAINTENANCE_PRIORITY.LOW },
          { value: MAINTENANCE_PRIORITY.NORMAL, label: MAINTENANCE_PRIORITY.NORMAL },
          { value: MAINTENANCE_PRIORITY.HIGH, label: MAINTENANCE_PRIORITY.HIGH },
          { value: MAINTENANCE_PRIORITY.URGENT, label: MAINTENANCE_PRIORITY.URGENT },
        ],
        placeholder: 'Select priority',
      },

      {
        key: 'status',
        label: 'Status',
        description: 'Basic information about the maintenance task',
        fieldType: 'select',
        isRequired: true,
        options: [
          { value: MAINTENANCE_STATUS.PENDING, label: MAINTENANCE_STATUS.PENDING },
          { value: MAINTENANCE_STATUS.ASSIGNED, label: MAINTENANCE_STATUS.ASSIGNED },
          { value: MAINTENANCE_STATUS.IN_PROGRESS, label: MAINTENANCE_STATUS.IN_PROGRESS },
          { value: MAINTENANCE_STATUS.COMPLETED, label: MAINTENANCE_STATUS.COMPLETED },
          { value: MAINTENANCE_STATUS.CANCELLED, label: MAINTENANCE_STATUS.CANCELLED },
        ],
        placeholder: 'Select status',
      },
      //category
      {
        key: 'category',
        label: 'Category',
        description: 'Basic information about the maintenance task',
        fieldType: 'select',
        isRequired: true,
        options: [
          { value: MAINTENANCE_CATEGORY.GENERAL, label: MAINTENANCE_CATEGORY.GENERAL },
          { value: MAINTENANCE_CATEGORY.PLUMBING, label: MAINTENANCE_CATEGORY.PLUMBING },
          { value: MAINTENANCE_CATEGORY.ELECTRICITY, label: MAINTENANCE_CATEGORY.ELECTRICITY },
        ],
        placeholder: 'Select category',
      },
    ],
  },
  {
    title: 'Scheduling',
    description: 'When and how often this task should be completed',
    fields: [
      {
        fieldType: 'layout',
        layout: 'row',
        label: 'Scheduling',
        description: 'When and how often this task should be completed',
        key: 'appointmentDate',
        fields: [
          {
            key: 'appointmentDate',
            label: 'Appointment date',
            description: 'Basic information about the maintenance task',
            fieldType: 'input',
            inputType: 'datetime',
            isRequired: true,
          },
          {
            key: 'dueDate',
            label: 'Due date',
            description: 'Basic information about the maintenance task',
            fieldType: 'input',
            inputType: 'datetime',
            isRequired: true,
          },
        ],
      },

      {
        key: 'estimatedHours',
        label: 'Estimated hours',
        description: 'Basic information about the maintenance task',
        fieldType: 'input',
        inputType: 'number',
        placeholder: 'Enter Estimated Hours',
        maxLength: 9,
      },
      {
        key: 'estimatedCost',
        label: 'Estimated Cost',
        fieldType: 'input',
        inputType: 'number',
        placeholder: 'Enter Estimated Cost',
        maxLength: 9,
      },

      {
        key: 'isEmergency',
        label: 'Emergency',
        fieldType: 'switch',
      },
    ],
  },
]
