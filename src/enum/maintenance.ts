export enum MAINTENANCE_STATUS {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum MAINTENANCE_PRIORITY {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum MAINTENANCE_CATEGORY {
  GENERAL = 'general',
  ELECTRICAL = 'electrical',
  PLUMBING = 'plumbing',
  HVAC = 'hvac',
}

export enum MAINTENANCE_RECURRING {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
}

export enum MAINTENANCE_SORT {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}
