import { CircleCheckBig, Clock, ScrollText } from 'lucide-react'
import { z } from 'zod'

import { MAINTENANCE_CATEGORY, MAINTENANCE_PRIORITY, MAINTENANCE_RECURRING, MAINTENANCE_STATUS } from '@/enum'
import type {
  FORM_SECTION,
  IStatsCardProps,
  MAINTENANCE_FORM_FIELDS_TYPE,
  UPDATE_MAINTENANCE_FORM_FIELDS_TYPE,
} from '@/types'

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

export const MAINTENANCE_TABLE_DATA = [
  {
    room: 101,
    buildings: 'A',
    issuesDate: '15/08/2025',
    appointmentDate: '20/08/2025',
    servicerequest: 'น้ำแอร์รั่ว',
    status: 'Pending',
    type: 'warning',
  },
  {
    room: 102,
    buildings: 'A',
    issuesDate: '15/08/2025',
    appointmentDate: '20/08/2025',
    servicerequest: 'น้ำแอร์รั่ว',
    status: 'Pending',
    type: 'warning',
  },
  {
    room: 103,
    buildings: 'A',
    issuesDate: '15/08/2025',
    appointmentDate: '20/08/2025',
    servicerequest: 'น้ำแอร์รั่ว',
    status: 'Done',
    type: 'success',
  },
  {
    room: 101,
    buildings: 'A',
    issuesDate: '15/08/2025',
    appointmentDate: '20/08/2025',
    servicerequest: 'น้ำแอร์รั่ว',
    status: 'Inactive',
    type: 'error',
  },
]

export const MAINTENANCE_TABLE_HEADER = [
  'Ticket Number',
  'Service Request Reason',
  'Room',
  'Buildings',
  'Appointment Date',
  'Due Date',
  'Status',
  'Action',
]

export const MAINTENANCE_FORM_SCHEMA = z.object({
  unit_id: z.string({ error: 'Room number is required.' }).min(1, 'Room number is required.'),
  title: z.string({ error: 'Task title is required.' }).min(1, 'Task title is required.'),
  description: z.string({ error: 'Task description is required.' }).min(1, 'Task description is required.'),
  status: z.string({ error: 'Task status is required.' }).min(1, 'Task status is required.'),
  priority: z.string({ error: 'Task priority is required.' }).min(1, 'Task priority is required.'),
  appointment_date: z.string({ error: 'Appointment date is required.' }).min(1, 'Appointment date is required.'),
  due_date: z.string({ error: 'Due date is required.' }).optional(),
  estimated_hours: z.string().optional(),
})

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
        options: [
          { value: 'low', label: 'Low' },
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'High' },
          { value: 'urgent', label: 'Urgent' },
        ],
        placeholder: 'Select priority',
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
        key: 'appointment_date',
        fields: [
          {
            key: 'appointment_date',
            label: 'Appointment date',
            description: 'Basic information about the maintenance task',
            fieldType: 'input',
            inputType: 'datetime',
          },
          {
            key: 'due_date',
            label: 'Due date',
            description: 'Basic information about the maintenance task',
            fieldType: 'input',
            inputType: 'datetime',
          },
        ],
      },
      {
        key: 'estimated_hours',
        label: 'Estimated hours',
        description: 'Basic information about the maintenance task',
        fieldType: 'input',
        inputType: 'number',
        placeholder: 'Enter Estimated Hours',
        maxLength: 9,
      },
    ],
  },
  {
    title: 'Location',
    description: 'Select the room where this task should be completed',
    fields: [
      {
        key: 'unit_id',
        label: 'Room number',
        placeholder: 'Select Room Number',
        description: 'Basic information about the maintenance task',
        fieldType: 'select',
        options: [
          { value: 'room1', label: 'Room 1' },
          { value: 'room2', label: 'Room 2' },
          { value: 'room3', label: 'Room 3' },
        ],
      },
    ],
  },
]

export const UPDATE_MAINTENANCE_FORM_SCHEMA = z.object({
  title: z.string().max(100, 'Title must be at most 100 characters').optional().nullable(),
  description: z.string().optional().nullable(),
  appointmentDate: z.string().optional().nullable(),
  dueDate: z.string().optional().nullable(),
  priority: z
    .enum([
      MAINTENANCE_PRIORITY.LOW,
      MAINTENANCE_PRIORITY.NORMAL,
      MAINTENANCE_PRIORITY.HIGH,
      MAINTENANCE_PRIORITY.URGENT,
    ])
    .optional()
    .nullable(),
  status: z
    .enum([
      MAINTENANCE_STATUS.PENDING,
      MAINTENANCE_STATUS.ASSIGNED,
      MAINTENANCE_STATUS.IN_PROGRESS,
      MAINTENANCE_STATUS.COMPLETED,
      MAINTENANCE_STATUS.CANCELLED,
    ])
    .optional()
    .nullable(),
  category: z
    .enum([
      MAINTENANCE_CATEGORY.GENERAL,
      MAINTENANCE_CATEGORY.ELECTRICAL,
      MAINTENANCE_CATEGORY.PLUMBING,
      MAINTENANCE_CATEGORY.HVAC,
    ])
    .optional()
    .nullable(),
  recurringSchedule: z
    .enum([MAINTENANCE_RECURRING.WEEKLY, MAINTENANCE_RECURRING.MONTHLY, MAINTENANCE_RECURRING.QUARTERLY])
    .optional()
    .nullable(),
  estimatedHours: z.coerce.number().min(0, 'Estimated hours cannot be negative').optional().nullable(),
})

export const UPDATE_MAINTENANCE_FORM_FIELDS: Array<FORM_SECTION<UPDATE_MAINTENANCE_FORM_FIELDS_TYPE>> = [
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
      },
      {
        key: 'description',
        label: 'Description',
        description: 'Basic information about the maintenance task',
        fieldType: 'input',
        inputType: 'textarea',
        placeholder: 'Enter task description',
      },
      {
        key: 'priority',
        label: 'Priority',
        description: 'Basic information about the maintenance task',
        fieldType: 'select',
        options: [
          { value: MAINTENANCE_PRIORITY.LOW, label: 'Low' },
          { value: MAINTENANCE_PRIORITY.NORMAL, label: 'Normal' },
          { value: MAINTENANCE_PRIORITY.HIGH, label: 'High' },
          { value: MAINTENANCE_PRIORITY.URGENT, label: 'Urgent' },
        ],
        placeholder: 'Select Priority',
      },
      {
        key: 'status',
        label: 'Status',
        description: 'Basic information about the maintenance task',
        fieldType: 'select',
        options: [
          { value: MAINTENANCE_STATUS.PENDING, label: 'Pending' },
          { value: MAINTENANCE_STATUS.ASSIGNED, label: 'Assigned' },
          { value: MAINTENANCE_STATUS.IN_PROGRESS, label: 'In Progress' },
          { value: MAINTENANCE_STATUS.COMPLETED, label: 'Completed' },
          { value: MAINTENANCE_STATUS.CANCELLED, label: 'Cancelled' },
        ],
        placeholder: 'Select Status',
      },
      {
        key: 'category',
        label: 'Category',
        description: 'Basic information about the maintenance task',
        fieldType: 'select',
        options: [
          { value: MAINTENANCE_CATEGORY.GENERAL, label: 'General' },
          { value: MAINTENANCE_CATEGORY.ELECTRICAL, label: 'Electrical' },
          { value: MAINTENANCE_CATEGORY.PLUMBING, label: 'Plumbing' },
          { value: MAINTENANCE_CATEGORY.HVAC, label: 'HVAC' },
        ],
        placeholder: 'Select Category',
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
          },
          {
            key: 'dueDate',
            label: 'Due date',
            description: 'Basic information about the maintenance task',
            fieldType: 'input',
            inputType: 'datetime',
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
      },
      {
        key: 'recurringSchedule',
        label: 'Recurring schedule',
        description: 'Basic information about the maintenance task',
        fieldType: 'select',
        options: [
          { value: MAINTENANCE_RECURRING.WEEKLY, label: 'Weekly' },
          { value: MAINTENANCE_RECURRING.MONTHLY, label: 'Monthly' },
          { value: MAINTENANCE_RECURRING.QUARTERLY, label: 'Quarterly' },
        ],
        placeholder: 'Select Recurring Schedule',
      },
    ],
  },
]
