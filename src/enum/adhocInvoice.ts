export enum ADHOC_INVOICE_PAYMENT_STATUS {
  PAID = 'paid',
  UNPAID = 'unpaid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
}

export enum ADHOC_INVOICE_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  // DRAFT = 'draft',
  // CANCELLED = 'cancelled',
  // INCLUDED = 'included',
}

export enum ADHOC_INVOICE_PRIORITY {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum ADHOC_INVOICE_CATEGORY {
  MISCELLANEOUS = 'miscellaneous',
  PENALTY = 'penalty',
}
