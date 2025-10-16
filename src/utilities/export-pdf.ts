import jsPDF from 'jspdf'

import type { IContract } from '@/types'

export const contractHandlePDFDownload = (data: IContract): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const pdf = new jsPDF('p', 'pt', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 40

      // Helper to safely convert values to strings
      const safe = (value: string | number | null | undefined) => {
        if (value === null || value === '') return 'N/A'
        return String(value)
      }

      // Header background with gradient effect
      pdf.setFillColor(41, 128, 185)
      pdf.rect(0, 0, pageWidth, 120, 'F')
      pdf.setFillColor(52, 152, 219)
      pdf.rect(0, 100, pageWidth, 20, 'F')

      // Title
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(28)
      pdf.setFont('bold')
      pdf.text('Rental Contract', pageWidth / 2, 50, { align: 'center' })

      // Contract number badge
      pdf.setFontSize(12)
      pdf.setFont('normal')
      pdf.text(`Contract #${safe(data.contractNumber)}`, pageWidth / 2, 80, { align: 'center' })

      let y = 150

      // Helper function for section headers
      const addSectionHeader = (title: string, yPos: number) => {
        pdf.setFillColor(236, 240, 241)
        pdf.rect(margin, yPos - 5, pageWidth - 2 * margin, 30, 'F')
        pdf.setTextColor(41, 128, 185)
        pdf.setFontSize(14)
        pdf.setFont('bold')
        pdf.text(title, margin + 10, yPos + 15)
        return yPos + 45
      }

      // Helper function for two-column layout
      const addFieldRow = (
        label1: string,
        value1: string | number | null | undefined,
        label2: string,
        value2: string | number | null | undefined,
        yPos: number,
      ) => {
        const colWidth = (pageWidth - 2 * margin) / 2

        // Left column
        pdf.setTextColor(127, 140, 141)
        pdf.setFontSize(10)
        pdf.setFont('normal')
        pdf.text(label1, margin + 10, yPos)

        pdf.setTextColor(44, 62, 80)
        pdf.setFontSize(11)
        pdf.setFont('bold')
        pdf.text(safe(value1), margin + 10, yPos + 15)

        // Right column (if provided)
        if (label2 && value2 !== '' && value2 !== null) {
          pdf.setTextColor(127, 140, 141)
          pdf.setFontSize(10)
          pdf.setFont('normal')
          pdf.text(label2, margin + colWidth + 10, yPos)

          pdf.setTextColor(44, 62, 80)
          pdf.setFontSize(11)
          pdf.setFont('bold')
          pdf.text(safe(value2), margin + colWidth + 10, yPos + 15)
        }

        return yPos + 35
      }

      // Property Information Section
      y = addSectionHeader('Property Information', y)
      y = addFieldRow('Building', data.buildingName, 'Apartment', data.apartmentName, y)
      y = addFieldRow('Unit', data.unitName, 'Rental Type', data.rentalType, y)
      y += 10

      // Tenant Information Section
      y = addSectionHeader('Tenant Information', y)
      y = addFieldRow('Full Name', data.tenantName, 'Email', data.tenantEmail, y)
      y = addFieldRow('Phone', data.tenantPhone, '', null, y)
      y += 10

      // Guarantor Information Section
      y = addSectionHeader('Guarantor Information', y)
      y = addFieldRow('Full Name', data.guarantorName, 'Phone', data.guarantorPhone, y)
      y = addFieldRow('ID Number', data.guarantorIdNumber, '', null, y)
      y += 10

      // Financial Details Section
      y = addSectionHeader('Financial Details', y)
      y = addFieldRow(
        'Rental Price',
        `$${data.rentalPrice?.toLocaleString() || '0'}`,
        'Deposit',
        `$${data.depositAmount?.toLocaleString() || '0'}`,
        y,
      )
      y = addFieldRow(
        'Advance Payment',
        `${safe(data.advancePaymentMonths)} months`,
        'Late Fee',
        `$${data.lateFeeAmount?.toLocaleString() || '0'}`,
        y,
      )
      y = addFieldRow('Utilities Included', data.utilitiesIncluded ? 'Yes' : 'No', '', null, y)
      y += 10

      // Contract Period Section
      y = addSectionHeader('Contract Period', y)
      y = addFieldRow('Start Date', data.startDate, 'End Date', data.endDate, y)
      y = addFieldRow(
        'Duration',
        `${safe(data.contractDurationDays)} days`,
        'Days Until Expiry',
        `${safe(data.daysUntilExpiry)} days`,
        y,
      )
      y = addFieldRow(
        'Auto Renewal',
        data.autoRenewal ? 'Enabled' : 'Disabled',
        'Notice Period',
        `${safe(data.renewalNoticeDays)} days`,
        y,
      )
      y += 10

      // Utility Meters Section
      y = addSectionHeader('Utility Meters (Starting Values)', y)
      y = addFieldRow('Water Meter', safe(data.waterMeterStart), 'Electric Meter', safe(data.electricMeterStart), y)
      y += 10

      // Status Section
      y = addSectionHeader('Contract Status', y)
      const getStatusEmoji = (status: string) => {
        if (status === 'ACTIVE') return 'Active'
        if (status === 'EXPIRED') return 'Expired'
        return safe(status)
      }
      y = addFieldRow('Status', getStatusEmoji(data.status), 'Signed At', data.signedAt || 'Not signed', y)

      // Add some space before footer
      y += 20

      // Footer section
      const footerY = Math.max(y, pageHeight - 80)
      pdf.setDrawColor(236, 240, 241)
      pdf.setLineWidth(1)
      pdf.line(margin, footerY, pageWidth - margin, footerY)

      pdf.setFontSize(9)
      pdf.setTextColor(149, 165, 166)
      pdf.setFont('normal')

      // Page border
      pdf.setDrawColor(41, 128, 185)
      pdf.setLineWidth(2)
      pdf.rect(20, 20, pageWidth - 40, pageHeight - 40)

      // Save the PDF
      pdf.save(`contract_${safe(data.contractNumber)}_${safe(data.tenantName).replace(/\s+/g, '_')}.pdf`)

      // Resolve the promise after a short delay to ensure file download starts
      setTimeout(() => resolve(), 100)
    } catch (error) {
      reject(error)
    }
  })
}
