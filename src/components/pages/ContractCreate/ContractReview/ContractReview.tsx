import { Calendar, CheckCircle2, DollarSign, FileText, Home, Lightbulb, Shield, User } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'

import { Card, CardContent } from '@/components/common'
import { Badge } from '@/components/ui'
import type { MonthlyContractFormData } from '@/types'
import { calculateMonth, formatCurrency, formatDate } from '@/utilities'

import ReviewItem from './ReviewItem'
import SectionCard from './SectionCard'

type IContractReview = {
  form: UseFormReturn<MonthlyContractFormData>
}
const ContractReview = ({ form }: IContractReview) => {
  const values = form.getValues()

  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <div className="bg-theme-primary text-theme-white relative overflow-hidden rounded-xl p-6 shadow">
        <div className="space-x-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-5" />
            <h3 className="font-bold">Review Your Contract</h3>
          </div>
          <p className="text-theme-white/90 max-w-2xl">
            Please review all details carefully before submitting. You can edit any section by clicking the Back button.
          </p>
        </div>
        <div className="bg-theme-white/10 absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full" />
      </div>

      {/* Contract Details Grid */}
      <div className="desktop:grid-cols-2 grid gap-6">
        {/* Tenant Information */}
        <SectionCard title="Tenant Information" description="Primary tenant details">
          <ReviewItem icon={User} label="Tenant Name" value={values.tenantName || 'Not specified'} highlight />
        </SectionCard>

        {/* Property Details */}
        <SectionCard title="Property Details" description="Rental type and features">
          <ReviewItem icon={Home} label="Rental Type" value={values.rentalType || 'Not specified'} />
          <ReviewItem
            icon={Lightbulb}
            label="Utilities Included"
            value={
              <Badge variant={values.utilitiesIncluded ? 'default' : 'secondary'}>
                {values.utilitiesIncluded ? 'Yes' : 'No'}
              </Badge>
            }
          />
        </SectionCard>

        {/* Financial Terms */}
        <SectionCard title="Financial Terms" description="Pricing and deposit information">
          <ReviewItem
            icon={DollarSign}
            label="Monthly Rental Price"
            value={formatCurrency(Number(values.rentalPrice) || 0)}
            highlight
          />
          <ReviewItem
            icon={Shield}
            label="Security Deposit"
            value={formatCurrency(Number(values.depositAmount) || 0)}
          />
        </SectionCard>

        {/* Contract Period */}
        <SectionCard title="Contract Period" description="Lease duration and dates">
          <ReviewItem icon={Calendar} label="Start Date" value={formatDate(values.startDate, 'DD-MM-YYYY')} highlight />
          <ReviewItem icon={Calendar} label="End Date" value={formatDate(values.endDate, 'DD-MM-YYYY')} />
          {values.startDate && values.endDate && (
            <div className="bg-theme-success-100 mt-3 rounded-lg p-3">
              <p className="text-body-2 text-theme-secondary-600">Contract Duration</p>
              <p className="text-body-2 font-semibold">{calculateMonth(values.startDate, values.endDate)} months</p>
            </div>
          )}
        </SectionCard>
      </div>

      {/* Important Notice */}
      <Card className="border-theme-primary/20 bg-theme-primary/30 justify-center rounded-xl shadow">
        <CardContent className="px-0">
          <div className="flex gap-3">
            <FileText className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="font-semibold">Important Notice</p>
              <p className="text-body-2 text-theme-secondary">
                By submitting this contract, you agree to the terms and conditions outlined above. Please ensure all
                information is accurate as changes after submission may require additional processing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContractReview
