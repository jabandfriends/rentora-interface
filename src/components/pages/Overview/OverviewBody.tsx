import { useState } from 'react'

import OverviewHeader from './OverviewHeader'
import OverviewLeaseExpiration from './OverviewLeaseExpiration'
import OverviewMaintenanceAlert from './OverviewMaintenanceAlert'
import OverviewMaintenanceRequest from './OverviewMaintenanceRequest'
import OverviewPaymentStatus from './OverviewPaymentStatus'
import OverviewStats from './OverviewStats'
import OverviewUpcomingRecurringMaintenance from './OverviewUpcomingRecurringMaintenance'
import OverviewVacantUnits from './OverviewVacantUnits'

const OverviewBody = () => {
  const [filterPriority, setFilterPriority] = useState('all')

  // Sample data
  const dashboardStats = {
    totalUnits: 48,
    occupiedUnits: 42,
    vacantUnits: 6,
    maintenanceRequests: 8,
    monthlyRevenue: 84600,
    pendingPayments: 12400,
    occupancyRate: 87.5,
  }

  const upcomingMaintenance = [
    {
      unit: '101',
      type: 'HVAC Filter Replacement',
      dueDate: '2025-10-20',
      daysUntil: 4,
      recurring: 'Every 3 months',
      lastCompleted: '2025-07-20',
      priority: 'medium',
      tenant: 'John Smith',
    },
    {
      unit: '205',
      type: 'Fire Extinguisher Inspection',
      dueDate: '2025-10-18',
      daysUntil: 2,
      recurring: 'Annual',
      lastCompleted: '2024-10-18',
      priority: 'high',
      tenant: 'Sarah Johnson',
    },
    {
      unit: '312',
      type: 'Water Heater Service',
      dueDate: '2025-10-22',
      daysUntil: 6,
      recurring: 'Every 6 months',
      lastCompleted: '2025-04-22',
      priority: 'high',
      tenant: 'Mike Chen',
    },
    {
      unit: '108',
      type: 'Smoke Detector Testing',
      dueDate: '2025-10-17',
      daysUntil: 1,
      recurring: 'Monthly',
      lastCompleted: '2025-09-17',
      priority: 'high',
      tenant: 'Emily Davis',
    },
    {
      unit: '419',
      type: 'Air Conditioner Maintenance',
      dueDate: '2025-10-25',
      daysUntil: 9,
      recurring: 'Every 4 months',
      lastCompleted: '2025-06-25',
      priority: 'medium',
      tenant: 'Robert Wilson',
    },
    {
      unit: '203',
      type: 'Plumbing Inspection',
      dueDate: '2025-10-28',
      daysUntil: 12,
      recurring: 'Every 6 months',
      lastCompleted: '2025-04-28',
      priority: 'medium',
      tenant: 'Lisa Anderson',
    },
  ]

  const leaseExpirations = [
    { unit: '304', tenant: 'Jennifer Brown', expiryDate: '2025-11-15', daysUntil: 30, status: 'pending' },
    { unit: '512', tenant: 'David Martinez', expiryDate: '2025-11-28', daysUntil: 43, status: 'pending' },
    { unit: '207', tenant: 'Amanda White', expiryDate: '2025-12-10', daysUntil: 55, status: 'renewing' },
    { unit: '403', tenant: 'James Taylor', expiryDate: '2025-12-20', daysUntil: 65, status: 'pending' },
  ]

  const paymentStatus = [
    { unit: '215', tenant: 'Karen Lee', amount: 2400, status: 'paid', date: '2025-10-01' },
    { unit: '308', tenant: 'Thomas Green', amount: 2200, status: 'paid', date: '2025-10-02' },
    { unit: '419', tenant: 'Robert Wilson', amount: 2800, status: 'overdue', daysOverdue: 5 },
    { unit: '502', tenant: 'Patricia Moore', amount: 1900, status: 'overdue', daysOverdue: 12 },
    { unit: '611', tenant: 'Michael Scott', amount: 2600, status: 'pending', dueDate: '2025-10-20' },
  ]

  const maintenanceRequests = [
    {
      unit: '408',
      issue: 'Leaking faucet in bathroom',
      priority: 'high',
      reportedDate: '2025-10-15',
      status: 'pending',
    },
    {
      unit: '219',
      issue: 'AC not cooling properly',
      priority: 'high',
      reportedDate: '2025-10-14',
      status: 'in-progress',
    },
    {
      unit: '507',
      issue: 'Light fixture replacement needed',
      priority: 'low',
      reportedDate: '2025-10-13',
      status: 'pending',
    },
    {
      unit: '310',
      issue: 'Dishwasher making noise',
      priority: 'medium',
      reportedDate: '2025-10-12',
      status: 'in-progress',
    },
  ]

  const filteredMaintenance =
    filterPriority === 'all' ? upcomingMaintenance : upcomingMaintenance.filter((m) => m.priority === filterPriority)

  return (
    <div className="space-y-6">
      {/* Header */}
      <OverviewHeader />

      {/* Stats Grid */}
      <OverviewStats {...dashboardStats} />

      {/* Urgent Maintenance Alert */}
      <OverviewMaintenanceAlert upcomingMaintenance={upcomingMaintenance} />

      {/* Upcoming Recurring Maintenance */}
      <OverviewUpcomingRecurringMaintenance
        maintenance={filteredMaintenance}
        handleFilterPriority={setFilterPriority}
      />

      <div className="desktop:grid-cols-2 grid gap-6">
        <OverviewMaintenanceRequest maintenanceRequests={maintenanceRequests} />

        <OverviewLeaseExpiration leaseExpirations={leaseExpirations} />
      </div>

      {/* Payment Status */}
      <OverviewPaymentStatus paymentStatus={paymentStatus} />

      {/* Vacant Units */}
      <OverviewVacantUnits vacantUnits={6} />
    </div>
  )
}

export default OverviewBody
