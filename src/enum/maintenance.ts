export enum MAINTENANCE_STATUS {
  COMPLETED = 'completed',
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in_progress',
  CANCELLED = 'cancelled',
}

export enum MAINTENANCE_CATEGORY {
  GENERAL = 'general',
  PLUMBING = 'plumbing',
  ELECTRICITY = 'electrical',
}

export enum MAINTENANCE_PRIORITY {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum RecurringSchedule {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
}
