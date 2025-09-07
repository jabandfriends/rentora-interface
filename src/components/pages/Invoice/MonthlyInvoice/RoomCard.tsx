import type { HTMLAttributes } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Card } from '@/components/common'
import { Badge } from '@/components/ui'
import { ROUTES } from '@/constants'
import { cn } from '@/utilities'

type IRoomCardProps = HTMLAttributes<HTMLDivElement>
const RoomCard = ({ className, ...props }: IRoomCardProps) => {
  const navigate = useNavigate()
  return (
    <Card className={cn('border-theme-secondary-300 w-92 rounded-2xl border py-5', className)} {...props}>
      <div>
        <div className="flex items-center justify-between">
          <h4>Room 101</h4>
          <Badge variant="error">Overdue</Badge>
        </div>
        <p className="text-theme-secondary-500">John Smith</p>
      </div>
      <div className="text-theme-secondary flex flex-col">
        <div className="flex justify-between">
          <p>Rent :</p>
          <p>฿1,000</p>
        </div>
        <div className="flex justify-between">
          <p>Power : </p>
          <p>฿1,000</p>
        </div>
        <div className="flex justify-between">
          <p>Water : </p>
          <p>฿1,000</p>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <h4>Total :</h4>
          <p className="text-theme-primary">฿1,000</p>
        </div>
        <span className="text-theme-secondary">Invoice : INV-2024-06-101</span>
      </div>
      <Button onClick={() => navigate(ROUTES.monthlyInvoiceDetail.getURL('1'))} block>
        View
      </Button>
    </Card>
  )
}

export default RoomCard
