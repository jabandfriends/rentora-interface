import jsPDF from 'jspdf'

import { ApartmentPaymentMethodType, CONTRACT_RENTAL_TYPE, CONTRACT_STATUS, UtilityPriceType } from '@/enum'
import type { IContract, IMonthlyInvoiceDetail } from '@/types'

import { formatCurrency, formatDate } from '.'

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

      // Financial Details Section
      y = addSectionHeader('Financial Details', y)
      y = addFieldRow(
        'Rental Price',
        `${data.rentalPrice?.toLocaleString() || '0'} THB`,
        'Deposit',
        `${data.depositAmount?.toLocaleString() || '0'} THB`,
        y,
      )
      y = addFieldRow(
        'Advance Payment',
        `${safe(data.advancePaymentMonths)} months`,
        'Late Fee',
        `$${data.lateFeeAmount?.toLocaleString() || '0'}`,
        y,
      )

      y += 10

      // Contract Period Section
      y = addSectionHeader('Contract Period', y)
      y = addFieldRow(
        'Contract Range',
        `${formatDate(new Date(data.startDate), 'DD MMMM YYYY')} - ${formatDate(new Date(data.endDate), 'DD MMMM YYYY')}`,
        'Days Until Expiry',
        `${safe(data.daysUntilExpiry)} days`,
        y,
      )

      y += 10

      // Utility Meters Section
      y = addSectionHeader('Utility Meters (Starting Values)', y)
      y = addFieldRow(
        'Water Meter (unit)',
        safe(data.waterMeterStart),
        'Electric Meter (unit)',
        safe(data.electricMeterStart),
        y,
      )
      y += 10

      // Status Section
      y = addSectionHeader('Contract Status', y)
      const getStatusEmoji = (status: string) => {
        if (status === CONTRACT_STATUS.ACTIVE) return 'Active'
        if (status === CONTRACT_STATUS.EXPIRED) return 'Expired'
        if (status === CONTRACT_STATUS.TERMINATED) return 'Terminated'
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

export const exportInvoiceToPDF = async (
  invoice: IMonthlyInvoiceDetail,
  apartmentName: string = 'Apartment Monthly Invoice',
) => {
  return new Promise<void>((resolve, reject) => {
    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      let yPos = 20

      // Header
      doc.setFillColor(41, 128, 185)
      doc.rect(0, 0, pageWidth, 35, 'F')

      doc.setTextColor(255, 255, 255)
      doc.setFontSize(24)
      doc.setFont('bold')
      doc.text('INVOICE', pageWidth / 2, 15, { align: 'center' })

      doc.setFontSize(10)
      doc.setFont('normal')
      doc.text(apartmentName, pageWidth / 2, 25, { align: 'center' })

      yPos = 45
      doc.setTextColor(0, 0, 0)

      // Invoice Info Section
      doc.setFontSize(10)
      doc.setFont('bold')
      doc.text('Invoice Number:', 15, yPos)
      doc.setFont('normal')
      doc.text(invoice.invoiceNumber, 60, yPos)

      yPos += 7
      doc.setFont('bold')
      doc.text('Contract Number:', 15, yPos)
      doc.setFont('normal')
      doc.text(invoice.contractNumber, 60, yPos)

      yPos += 7
      doc.setFont('bold')
      doc.text('Issue Date:', 15, yPos)
      doc.setFont('normal')
      doc.text(formatDate(new Date(invoice.createdAt)), 60, yPos)

      yPos += 7
      doc.setFont('bold')
      doc.text('Due Date:', 15, yPos)
      doc.setFont('normal')
      doc.setTextColor(220, 53, 69)
      doc.text(formatDate(new Date(invoice.dueDate)), 60, yPos)
      doc.setTextColor(0, 0, 0)

      // Billing Period
      yPos += 7
      doc.setFont('bold')
      doc.text('Billing Period:', 15, yPos)
      doc.setFont('normal')
      doc.text(`${formatDate(new Date(invoice.billStart))} - ${formatDate(new Date(invoice.billEnd))}`, 60, yPos)

      // Tenant Info Section
      yPos += 12
      doc.setFillColor(52, 73, 94)
      doc.rect(15, yPos - 5, pageWidth - 30, 8, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFont('bold')
      doc.text('TENANT INFORMATION', 17, yPos)

      yPos += 10
      doc.setTextColor(0, 0, 0)
      doc.setFont('bold')
      doc.text('Email:', 15, yPos)
      doc.setFont('normal')
      doc.text(invoice.tenantEmail, 40, yPos)

      yPos += 7
      doc.setFont('bold')
      doc.text('Unit:', 15, yPos)
      doc.setFont('normal')
      doc.text(invoice.floorName, 40, yPos)

      yPos += 7
      doc.setFont('bold')
      doc.text('Rental Type:', 15, yPos)
      doc.setFont('normal')
      doc.text(
        invoice.rentalType === CONTRACT_RENTAL_TYPE.MONTHLY
          ? 'Monthly'
          : invoice.rentalType === CONTRACT_RENTAL_TYPE.DAILY
            ? 'Daily'
            : 'Yearly',
        40,
        yPos,
      )

      // Charges Table
      yPos += 15
      doc.setFillColor(52, 73, 94)
      doc.rect(15, yPos - 5, pageWidth - 30, 8, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFont('bold')
      doc.text('CHARGES BREAKDOWN', 17, yPos)

      yPos += 10
      doc.setTextColor(0, 0, 0)

      // Table Header
      doc.setFillColor(236, 240, 241)
      doc.rect(15, yPos - 5, pageWidth - 30, 8, 'F')
      doc.setFont('bold')
      doc.text('Description', 17, yPos)
      doc.text('Amount ', pageWidth - 45, yPos, { align: 'right' })

      yPos += 10

      // Rent
      doc.setFont('normal')
      doc.text('Rent', 17, yPos)
      doc.text(formatCurrency(invoice.contractRentAmount, 2, ''), pageWidth - 17, yPos, { align: 'right' })

      yPos += 7

      // Water Charges
      if (invoice.waterTotalCost > 0) {
        doc.setFont('bold')
        doc.text('Water Charges', 17, yPos)
        doc.setFont('normal')
        doc.text(formatCurrency(invoice.waterTotalCost, 2, ''), pageWidth - 17, yPos, { align: 'right' })

        yPos += 5
        doc.setFontSize(8)
        doc.setTextColor(100, 100, 100)
        if (invoice.waterPriceRateType === UtilityPriceType.METER) {
          doc.text(
            `  Previous: ${invoice.waterMeterStart.toFixed(2)} | Current: ${invoice.waterMeterEnd.toFixed(2)} | Usage: ${invoice.totalWaterUsageUnit.toFixed(2)} units @ ${formatCurrency(invoice.waterPricePerUnit, 2, '')}/unit`,
            17,
            yPos,
          )
        } else {
          doc.text(`  Fixed Rate: ${formatCurrency(invoice.waterFixedPrice, 2, '')}`, 17, yPos)
        }
        yPos += 5
        doc.setFontSize(10)
        doc.setTextColor(0, 0, 0)
      }

      // Electric Charges
      if (invoice.electricTotalCost > 0) {
        doc.setFont('bold')
        doc.text('Electric Charges', 17, yPos)
        doc.setFont('normal')
        doc.text(formatCurrency(invoice.electricTotalCost, 2, ''), pageWidth - 17, yPos, { align: 'right' })

        yPos += 5
        doc.setFontSize(8)
        doc.setTextColor(100, 100, 100)
        if (invoice.electricPriceRateType === UtilityPriceType.METER) {
          doc.text(
            `  Previous: ${invoice.electricMeterStart.toFixed(2)} | Current: ${invoice.electricMeterEnd.toFixed(2)} | Usage: ${invoice.totalElectricUsageUnit.toFixed(2)} units @ ${formatCurrency(invoice.electricPricePerUnit, 2, '')}/unit`,
            17,
            yPos,
          )
        } else {
          doc.text(`  Fixed Rate: ${formatCurrency(invoice.electricFixedPrice, 2, '')}`, 17, yPos)
        }
        yPos += 7
        doc.setFontSize(10)
        doc.setTextColor(0, 0, 0)
      }

      // Total Section
      yPos += 5
      doc.setDrawColor(200, 200, 200)
      doc.line(15, yPos, pageWidth - 15, yPos)
      yPos += 8

      doc.setFont('bold')
      doc.setFontSize(12)
      doc.text('TOTAL AMOUNT:', pageWidth - 80, yPos)
      doc.setFontSize(14)
      doc.text(`${formatCurrency(invoice.totalAmount, 2, '')}`, pageWidth - 17, yPos, { align: 'right' })

      // Payment Information
      yPos += 15
      doc.setFillColor(52, 73, 94)
      doc.rect(15, yPos - 5, pageWidth - 30, 8, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFont('bold')
      doc.text('PAYMENT INFORMATION', 17, yPos)

      yPos += 10
      doc.setTextColor(0, 0, 0)
      doc.setFont('bold')
      doc.text('Payment Method:', 15, yPos)
      doc.setFont('normal')

      const paymentMethodLabels: Record<ApartmentPaymentMethodType, string> = {
        [ApartmentPaymentMethodType.BANK_TRANSFER]: 'Bank Transfer',
        [ApartmentPaymentMethodType.PROMPTPAY]: 'PromptPay',
        [ApartmentPaymentMethodType.CASH]: 'Cash',
        [ApartmentPaymentMethodType.CREDIT_CARD]: 'Credit Card',
        [ApartmentPaymentMethodType.CHEQUE]: 'Cheque',
      }
      doc.text(paymentMethodLabels[invoice.apartmentPaymentMethodType], 60, yPos)

      yPos += 7

      if (invoice.apartmentPaymentMethodType === ApartmentPaymentMethodType.BANK_TRANSFER) {
        doc.setFont('bold')
        doc.text('Bank Name:', 15, yPos)
        doc.setFont('normal')
        doc.text(invoice.bankName, 60, yPos)

        yPos += 7
        doc.setFont('bold')
        doc.text('Account Number:', 15, yPos)
        doc.setFont('normal')
        doc.text(invoice.bankAccountNumber, 60, yPos)

        yPos += 7
        doc.setFont('bold')
        doc.text('Account Holder:', 15, yPos)
        doc.setFont('normal')
        doc.text(invoice.accountHolderName, 60, yPos)
      } else if (invoice.apartmentPaymentMethodType === ApartmentPaymentMethodType.PROMPTPAY) {
        doc.setFont('bold')
        doc.text('PromptPay Number:', 15, yPos)
        doc.setFont('normal')
        doc.text(invoice.promptpayNumber, 60, yPos)
      }

      // Footer
      yPos = pageHeight - 20
      doc.setFontSize(8)
      doc.setTextColor(150, 150, 150)
      doc.text('Thank you for your payment!', pageWidth / 2, yPos, { align: 'center' })
      doc.text(`Generated on ${new Date().toLocaleString('th-TH')}`, pageWidth / 2, yPos + 5, { align: 'center' })

      // Save PDF
      doc.save(`Invoice_${invoice.invoiceNumber}.pdf`)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}
