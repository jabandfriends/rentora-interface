export const PAYMENT_TABLE_HEADER: Array<string> = [
  'Payment No.',
  'Unit Name',
  'Building Name',
  'Amount',
  'Payment Status',
  'Verification Status',
]

export enum PAYMENT_STATUS_ENUM {
  Completed = 'completed',
  Pending = 'pending',
  Failed = 'failed',
}

export enum VERIFIED_STATUS_ENUM {
  Verified = 'verified',
  Unverified = 'unverified',
  Rejected = 'rejected',
}
