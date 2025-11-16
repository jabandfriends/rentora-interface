import { CheckCircle, Download } from 'lucide-react'

import { Button, Card, CardContent, CardDescription, CardTitle } from '@/components/common'
import { Badge, Separator } from '@/components/ui'

const TenantAdhocInvoiceCard = () => {
  return (
    <Card className="border-theme-secondary-300 rounded-xl border shadow-none hover:shadow">
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Cleaning Service Charge</CardTitle>
            <CardDescription>Due : 15/11/2025</CardDescription>
          </div>
          <Badge variant="success">
            <CheckCircle size={16} /> Paid
          </Badge>
        </div>
        <Separator />
        {/* Adhoc Invoice Detail */}
        <p className="text-theme-secondary text-body-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </p>
        <div className="flex items-center justify-between">
          <div>
            <h5 className="font-semibold">Amount</h5>
            <p className="text-theme-secondary">10,000 THB</p>
          </div>
          <div>
            <h5 className="font-semibold">Paid Date</h5>
            <p className="text-theme-secondary">10/11/2025</p>
          </div>
          <Button className="flex items-center gap-x-2" variant="outline">
            <Download size={16} />
            Receipt
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default TenantAdhocInvoiceCard
