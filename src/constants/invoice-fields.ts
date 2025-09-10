import z from 'zod'

import type { FORM_SECTION, INVOICE_FORM_FIELDS_TYPE } from '@/types'

// Enums

export const AdhocInvoiceSchema = z.object({
  //invoice detail
  title: z.string({ error: 'Title is required' }).min(1, 'Title is required').max(200),
  description: z.string().max(200).optional(),
  category: z.string({ error: 'Category is required' }),

  // amount detail
  final_amount: z.string({ error: 'Final amount is required' }),

  //date detail
  due_date: z.string({ error: 'Due date is required' }),

  // monthly invoice integration
  include_in_monthly: z.string({ error: 'Include in monthly is required' }),

  //payment tracking
  payment_status: z.string({ error: 'Payment status is required' }),

  //status
  status: z.string({ error: 'Status is required' }),
  priority: z.string({ error: 'Priority is required' }),
})

export const INVOICE_FORM_FIELDS: Array<FORM_SECTION<INVOICE_FORM_FIELDS_TYPE>> = [
  {
    title: 'Invoice Information',
    description: 'Basic information about the invoice',
    fields: [
      {
        key: 'title',
        label: 'Invoice Title',
        fieldType: 'input',
        inputType: 'text',
        description: 'A short title for this invoice',
        placeholder: 'Enter invoice title',
      },
      {
        key: 'description',
        label: 'Description',
        fieldType: 'input',
        inputType: 'textarea',
        description: 'Detailed description of the invoice',
        placeholder: 'Enter invoice description',
      },

      {
        fieldType: 'layout',
        layout: 'row',
        key: 'due_date',
        fields: [
          {
            key: 'due_date',
            label: 'Due Date',
            fieldType: 'input',
            inputType: 'datetime',
          },
        ],
      },
    ],
  },
  {
    title: 'Billing Details',
    description: 'Item and amount details',
    fields: [
      {
        key: 'category',
        label: 'Category',
        fieldType: 'select',
        placeholder: 'Select category',
        options: [
          { value: 'penalty', label: 'Penalty' },
          { value: 'miscellaneous', label: 'Miscellaneous' },
        ],
      },
      {
        key: 'final_amount',
        label: 'Amount',
        fieldType: 'input',
        inputType: 'number',
        placeholder: 'Enter amount',
      },
      {
        key: 'payment_status',
        label: 'Payment Status',
        fieldType: 'select',
        placeholder: 'Select payment status',
        options: [
          { value: 'paid', label: 'Paid' },
          { value: 'unpaid', label: 'Unpaid' },
          { value: 'cancelled', label: 'Cancelled' },
        ],
      },
    ],
  },
  {
    title: 'Additional Information',
    description: 'Additional details and notes',
    fields: [
      {
        key: 'include_in_monthly',
        fieldType: 'select',
        label: 'Include in Monthly Invoice',
        placeholder: 'Select include in monthly',
        options: [
          { value: 'true', label: 'Yes' },
          { value: 'false', label: 'No' },
        ],
      },
      {
        key: 'priority',
        label: 'Priority',
        fieldType: 'select',
        placeholder: 'Select priority',
        options: [
          { value: 'low', label: 'Low' },
          { value: 'normal', label: 'Normal' },
          { value: 'high', label: 'High' },
          { value: 'urgent', label: 'Urgent' },
        ],
      },
    ],
  },
  {
    title: 'Status',
    description: 'Status of the invoice',
    fields: [
      {
        key: 'status',
        label: 'Status',
        fieldType: 'select',
        placeholder: 'Select status',
        options: [
          { value: 'draft', label: 'Draft' },
          { value: 'active', label: 'Active' },
          { value: 'cancelled', label: 'Cancelled' },
          { value: 'included', label: 'Included' },
        ],
      },
    ],
  },
]
