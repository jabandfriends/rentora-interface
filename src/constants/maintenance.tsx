import { CircleCheckBig, Clock, ScrollText } from 'lucide-react'
import { z } from 'zod'

import { Priority } from '@/enum'
import type { FORM_SECTION, IStatsCardProps, UPDATE_MAINTENANCE_FORM_FIELDS_TYPE } from '@/types'

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

export const UPDATE_MAINTENANCE_FORM_SCHEMA = z.object({
  title: z.string().max(100, 'Title must be at most 100 characters').optional().nullable(),
  description: z.string().optional().nullable(),
  appointmentDate: z.string().optional().nullable(),
  dueDate: z.string().optional().nullable(),
  priority: z.enum([Priority.LOW, Priority.NORMAL, Priority.HIGH, Priority.URGENT]).optional().nullable(),
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
          { value: Priority.LOW, label: 'Low' },
          { value: Priority.NORMAL, label: 'Normal' },
          { value: Priority.HIGH, label: 'High' },
          { value: Priority.URGENT, label: 'Urgent' },
        ],
        placeholder: 'Select Priority',
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
    ],
  },
  // {
  //   title: 'Location',
  //   description: 'Select the room where this task should be completed',
  //   fields: [
  //     {
  //       key: 'unit_id',
  //       label: 'Room number',
  //       placeholder: 'Select Room Number',
  //       description: 'Basic information about the maintenance task',
  //       fieldType: 'select',
  //       options: [
  //         { value: 'room1', label: 'Room 1' },
  //         { value: 'room2', label: 'Room 2' },
  //         { value: 'room3', label: 'Room 3' },
  //       ],
  //     },
  //   ],
  // },
]
