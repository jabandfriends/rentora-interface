import { CircleCheckBig, Clock, ScrollText } from 'lucide-react'
import z from 'zod'

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

export const MAINTENANCE_STATUS: Array<string> = ['Done', 'Pending', 'Inactive']

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
  'Room',
  'Buildings',
  'Issue Date',
  'Appointment Date',
  'Service Request Reason',
  'Status',
]

export const MAINTENANCE_FORM_SCHEMA = z.object({
  unit_id: z.string({ error: 'Room number is required.' }).min(1, 'Room number is required.'),
  title: z.string({ error: 'Task title is required.' }).optional(),
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
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
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
