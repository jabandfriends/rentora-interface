import { Plus, Trash2 } from 'lucide-react'

import { Button, Card, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'

type IRoomDetailServicesProps = {
  services: Array<any>
  selectedService: string
  setSelectedService: (service: string) => void
  addService: () => void
  removeService: (id: number) => void
}
const RoomDetailServices = ({
  services,
  selectedService,
  setSelectedService,
  addService,
  removeService,
}: IRoomDetailServicesProps) => {
  return (
    <Card className="border-border justify-start overflow-auto rounded-2xl shadow-lg hover:shadow-xl">
      <div className="border-theme-secondary-400 border-b pb-4">
        <h3>Services</h3>
        <p className="text-body-2 text-theme-secondary-600">Services will be automatically billed</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="service-select" className="text-base font-semibold">
            Add Service
          </Label>

          <div className="flex items-center justify-center gap-x-2">
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger id="service-select" className="flex-1">
                <SelectValue placeholder="Select service to add" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="common">Common Area Maintenance</SelectItem>
                <SelectItem value="parking">Parking Space</SelectItem>
                <SelectItem value="water">Water Supply</SelectItem>
                <SelectItem value="electric">Electricity</SelectItem>
                <SelectItem value="internet">Internet Service</SelectItem>
                <SelectItem value="security">Security Fee</SelectItem>
              </SelectContent>
            </Select>
            <Button size="icon" onClick={addService} className="flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Services Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell className="font-mono text-base font-semibold">฿{service.price.toFixed(2)}</TableCell>
                <TableCell className="flex w-12 justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeService(service.id)}
                    className="text-theme-error-800 hover:bg-theme-error/10 hover:text-theme-error flex items-center"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="border-border border-t p-4">
              <TableCell className="text-base font-semibold">Total</TableCell>
              <TableCell />
              <TableCell className="text-theme-primary font-bold">
                ${services.reduce((sum, s) => sum + s.price, 0).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}

export default RoomDetailServices
