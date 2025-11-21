import type { TestUser } from '@/types'

export const testUsers: Array<TestUser> = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'admin123' },
  { id: 2, name: 'Maintenance User', email: 'maintenance@example.com', password: 'maint123' },
  { id: 3, name: 'Accountant User', email: 'accountant@example.com', password: 'acct123' },
  { id: 4, name: 'Tenant', email: 'tenant@example.com', password: 'tenant123' },
]
