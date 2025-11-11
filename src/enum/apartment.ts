export enum APARTMENT_STATUS {
  INCOMPLETE = 'setup_incomplete',
  IN_PROGRESS = 'setup_in_progress',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum ApartmentPaymentMethodType {
  BANK_TRANSFER = 'bank_transfer',
  PROMPTPAY = 'promptpay',
  CREDIT_CARD = 'credit_card',
  CASH = 'cash',
  CHEQUE = 'cheque',
}

export enum APARTMENT_LATE_FEE_TYPE {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
}
