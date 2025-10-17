import z from 'zod'

import {
  ADHOC_INVOICE_CATEGORY,
  ADHOC_INVOICE_PAYMENT_STATUS,
  ADHOC_INVOICE_PRIORITY,
  ADHOC_INVOICE_STATUS,
} from '@/enum/adhocInvoice'
import type { FORM_SECTION, INVOICE_FORM_FIELDS_TYPE } from '@/types'
// Enums

export const AdhocInvoiceSchema = z
  .object({
    unitId: z.string({ error: 'Unit is required.' }).min(1, 'Unit is required.'),
    title: z.string({ error: 'Title is required.' }).min(1, 'Title is required.'),
    description: z.string().optional(),
    invoiceDate: z.string({ error: 'Invoice date is required.' }).min(1, 'Invoice date is required.'),
    dueDate: z.string({ error: 'Due date is required.' }).min(1, 'Due date is required.'),
    category: z.enum([ADHOC_INVOICE_CATEGORY.MISCELLANEOUS, ADHOC_INVOICE_CATEGORY.PENALTY], {
      error: 'Category is required',
    }),
    finalAmount: z.string({ error: 'Final amount is required.' }),
    paymentStatus: z.enum(
      [
        ADHOC_INVOICE_PAYMENT_STATUS.OVERDUE,
        ADHOC_INVOICE_PAYMENT_STATUS.PAID,
        ADHOC_INVOICE_PAYMENT_STATUS.UNPAID,
        ADHOC_INVOICE_PAYMENT_STATUS.CANCELLED,
      ],
      { error: 'Payment status is required' },
    ),
    notes: z.string().optional(),
    includeInMonthly: z.boolean(),
    priority: z.enum(
      [
        ADHOC_INVOICE_PRIORITY.HIGH,
        ADHOC_INVOICE_PRIORITY.NORMAL,
        ADHOC_INVOICE_PRIORITY.LOW,
        ADHOC_INVOICE_PRIORITY.URGENT,
      ],
      { error: 'Priority is required' },
    ),
    status: z.enum(
      [
        ADHOC_INVOICE_STATUS.ACTIVE,
        ADHOC_INVOICE_STATUS.CANCELLED,
        ADHOC_INVOICE_STATUS.DRAFT,
        ADHOC_INVOICE_STATUS.INCLUDED,
      ],
      { error: 'Status is required' },
    ),
  })
  .superRefine((data, ctx) => {
    // Check finalAmount is a valid number
    if (data.finalAmount.trim() === '' || isNaN(Number(data.finalAmount))) {
      ctx.addIssue({
        code: 'custom',
        message: 'Final amount must be a valid number.',
        path: ['finalAmount'],
      })
    }
    //final amount should > 0
    if (Number(data.finalAmount) <= 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Final amount must be greater than 0.',
        path: ['finalAmount'],
      })
    }
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
        key: 'invoiceDate',
        fields: [
          {
            key: 'invoiceDate',
            label: 'Start date',
            fieldType: 'input',
            inputType: 'datetime',
          },
        ],
      },
      {
        fieldType: 'layout',
        layout: 'row',
        key: 'dueDate',
        fields: [
          {
            key: 'dueDate',
            label: 'Due date',
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
          { value: ADHOC_INVOICE_CATEGORY.MISCELLANEOUS, label: ADHOC_INVOICE_CATEGORY.MISCELLANEOUS },
          { value: ADHOC_INVOICE_CATEGORY.PENALTY, label: ADHOC_INVOICE_CATEGORY.PENALTY },
        ],
      },
      {
        key: 'finalAmount',
        label: 'Amount',
        fieldType: 'input',
        inputType: 'number',
        placeholder: 'Enter amount',
      },
      {
        key: 'paymentStatus',
        label: 'Payment Status',
        fieldType: 'select',
        placeholder: 'Select payment status',
        options: [
          { value: ADHOC_INVOICE_PAYMENT_STATUS.PAID, label: ADHOC_INVOICE_PAYMENT_STATUS.PAID },
          { value: ADHOC_INVOICE_PAYMENT_STATUS.UNPAID, label: ADHOC_INVOICE_PAYMENT_STATUS.UNPAID },
          { value: ADHOC_INVOICE_PAYMENT_STATUS.OVERDUE, label: ADHOC_INVOICE_PAYMENT_STATUS.OVERDUE },
          { value: ADHOC_INVOICE_PAYMENT_STATUS.CANCELLED, label: ADHOC_INVOICE_PAYMENT_STATUS.CANCELLED },
        ],
      },
    ],
  },
  {
    title: 'Notes',
    description: 'Additional notes for the invoice',
    fields: [
      {
        key: 'notes',
        label: 'Notes',
        fieldType: 'input',
        inputType: 'textarea',
        description: 'Any additional notes regarding the invoice',
        placeholder: 'Enter additional notes',
      },
    ],
  },
  {
    title: 'Additional Information',
    description: 'Additional details and notes',
    fields: [
      {
        key: 'includeInMonthly',
        fieldType: 'select',
        label: 'Include in Monthly Invoice',
        placeholder: 'Select include in monthly',
        options: [
          { value: true, label: 'Yes' },
          { value: false, label: 'No' },
        ],
      },
      {
        key: 'priority',
        label: 'Priority',
        fieldType: 'select',
        placeholder: 'Select priority',
        options: [
          { value: ADHOC_INVOICE_PRIORITY.LOW, label: ADHOC_INVOICE_PRIORITY.LOW },
          { value: ADHOC_INVOICE_PRIORITY.NORMAL, label: ADHOC_INVOICE_PRIORITY.NORMAL },
          { value: ADHOC_INVOICE_PRIORITY.HIGH, label: ADHOC_INVOICE_PRIORITY.HIGH },
          { value: ADHOC_INVOICE_PRIORITY.URGENT, label: ADHOC_INVOICE_PRIORITY.URGENT },
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
          { value: ADHOC_INVOICE_STATUS.ACTIVE, label: ADHOC_INVOICE_STATUS.ACTIVE },
          { value: ADHOC_INVOICE_STATUS.CANCELLED, label: ADHOC_INVOICE_STATUS.CANCELLED },
          { value: ADHOC_INVOICE_STATUS.DRAFT, label: ADHOC_INVOICE_STATUS.DRAFT },
          { value: ADHOC_INVOICE_STATUS.INCLUDED, label: ADHOC_INVOICE_STATUS.INCLUDED },
        ],
      },
    ],
  },
]
