import { FileSpreadsheet } from 'lucide-react'
import { type ChangeEvent, useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Spinner } from '@/components/common'
import { SearchBar } from '@/components/feature'
import { useRentoraApiGetMonthlyInvoicesWithFullDetail } from '@/hooks'
import type { IReadingUnitUtility } from '@/types'
import { exportBulkMonthlyInvoiceToPDF } from '@/utilities'

type IMonthlyInvoiceSearchProps = {
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  handleGenMonthChange: (value: string) => void
  readingDateUtility: Array<IReadingUnitUtility>
  selectedGenMonth: string
}
const MonthlyInvoiceSearch = ({
  onSearchChange,
  placeholder = 'Search...',
  handleGenMonthChange,
  readingDateUtility,
  selectedGenMonth,
}: IMonthlyInvoiceSearchProps) => {
  const [isExportingBulkMonthlyInvoice, setIsExportingBulkMonthlyInvoice] = useState<boolean>(false)
  const { apartmentId } = useParams<{ apartmentId: string }>()

  //hooks data
  const { data: monthlyInvoicesWithFullDetails } = useRentoraApiGetMonthlyInvoicesWithFullDetail({
    apartmentId: apartmentId!,
    params: {
      genMonth: selectedGenMonth,
    },
  })

  const handleBulkGenerate = useCallback(async () => {
    if (!monthlyInvoicesWithFullDetails) return
    try {
      setIsExportingBulkMonthlyInvoice(true)
      await exportBulkMonthlyInvoiceToPDF(monthlyInvoicesWithFullDetails)
      toast.success('Bulk monthly invoice generated successfully')
      //eslint-disable-next-line
    } catch (_) {
      toast.error('Failed to generate bulk monthly invoice')
    } finally {
      setIsExportingBulkMonthlyInvoice(false)
    }
  }, [monthlyInvoicesWithFullDetails])

  return (
    <div className="flex gap-x-2">
      <SearchBar onChange={onSearchChange} placeholder={placeholder} />
      {/* Generate month select */}
      <Select onValueChange={handleGenMonthChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a month" />
        </SelectTrigger>
        <SelectContent>
          {readingDateUtility?.map((date: IReadingUnitUtility) => (
            <SelectItem key={date.readingDate} value={date.readingDate}>
              {date.readingDate}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* bulk monthly invoice generation */}
      {selectedGenMonth && monthlyInvoicesWithFullDetails && monthlyInvoicesWithFullDetails.length > 0 && (
        <Button
          className="flex items-center gap-2"
          onClick={handleBulkGenerate}
          disabled={isExportingBulkMonthlyInvoice}
        >
          {isExportingBulkMonthlyInvoice && <Spinner />}
          <FileSpreadsheet size={18} /> Bulk Generate
        </Button>
      )}
    </div>
  )
}

export default MonthlyInvoiceSearch
