import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import type { VariantProps } from 'tailwind-variants'

import { Button, Card, Spinner } from '@/components/common'
import { Badge } from '@/components/ui'
import { useRentoraApiMonthlyInvoiceGenerate } from '@/hooks'
import type { IGenerateMonthlyInvoiceRequestPayload, IUnitWithMonthlyInvoiceStatus } from '@/types'
import { getErrorMessage } from '@/utilities'

type IMonthlyInvoiceCreateTableProps = {
  room: IUnitWithMonthlyInvoiceStatus
  debouncedReadingDate: string
  paymentDueDate: number
}
const MonthlyInvoiceCreateTable = ({ room, debouncedReadingDate, paymentDueDate }: IMonthlyInvoiceCreateTableProps) => {
  const { mutateAsync: generateMonthlyInvoice, isPending } = useRentoraApiMonthlyInvoiceGenerate()
  const statusBadge: VariantProps<typeof Badge>['variant'] = useMemo(() => {
    switch (room.unitStatus) {
      case 'available':
        return 'success'
      default:
        return 'warning'
    }
  }, [room.unitStatus])

  const isButtonDisabled: boolean = useMemo(() => {
    return room.isMonthlyInvoiceCreated || isPending
  }, [room.isMonthlyInvoiceCreated, isPending])

  const handleGenerateMonthlyInvoice = useCallback(async () => {
    const payload: IGenerateMonthlyInvoiceRequestPayload = {
      unitId: room.unitId,
      readingDate: debouncedReadingDate,
      paymentDueDay: paymentDueDate ?? 1,
    }
    try {
      await generateMonthlyInvoice(payload)
      room.isMonthlyInvoiceCreated = true
      toast.success('Monthly invoice generated successfully')
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }, [generateMonthlyInvoice, debouncedReadingDate, paymentDueDate, room])
  return (
    <Card className="border-theme-secondary-300 rounded-lg border">
      {/* card header */}
      <div className="flex items-center justify-between">
        <div>
          <h3>{room.unitName}</h3>
          <p>{room.buildingName}</p>
        </div>
        <Badge variant={statusBadge} className="capitalize">
          {room.unitStatus}
        </Badge>
      </div>

      {/* card body */}
      <div>
        <Button onClick={handleGenerateMonthlyInvoice} block disabled={isButtonDisabled}>
          {isPending ? <Spinner /> : isButtonDisabled ? 'Generated' : 'Generate Monthly Invoice'}
        </Button>
      </div>
    </Card>
  )
}

export default MonthlyInvoiceCreateTable
