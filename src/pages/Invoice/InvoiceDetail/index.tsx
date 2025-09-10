import { PageSection } from '@/components/layout'
import { InvoiceDetail } from '@/components/pages/Invoice'

const mockInvoice = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  adhoc_number: 'ADH-2024-001',
  title: 'Parking Violation Fine',
  description: 'Parking in unauthorized area for 2 hours on December 15, 2024',
  category: 'penalty',
  final_amount: 150.0,
  invoice_date: '2024-01-15',
  due_date: '2024-02-15',
  payment_status: 'unpaid',
  paid_amount: 0,
  status: 'active',
  priority: 'normal',
  apartment: 'Sunset Towers',
  unit: 'Unit 4B',
  tenant_name: 'John Smith',
  tenant_email: 'john.smith@email.com',
  created_by: 'Admin User',
  notes: 'Violation captured on security camera. Multiple warnings were issued prior to this fine.',
  receipt_urls: ['receipt_001.pdf', 'violation_photo.jpg'],
  created_at: '2024-01-15T10:30:00Z',
  updated_at: '2024-01-15T10:30:00Z',
}
const InvoiceDetailPage = () => {
  return (
    <PageSection>
      <InvoiceDetail data={mockInvoice} />
    </PageSection>
  )
}

export default InvoiceDetailPage
