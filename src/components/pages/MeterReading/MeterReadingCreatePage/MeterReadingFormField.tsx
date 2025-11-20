import { LayoutGrid, Save, Table } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'

import { Button, Form, Spinner } from '@/components/common'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/feature'
import { PageTableEmpty, PageTableSearchEmpty } from '@/components/ui'
import { useTabQuery } from '@/hooks'
import type { MeterReadingFormValues } from '@/types'

import MeterReadingFormFieldCardsGroup from './MeterReadingFormFieldCardsGroup'
import MeterReadingFormFieldTable from './MeterReadingFormFieldTable'

type IMeterReadingFormFieldProps = {
  form: UseFormReturn<MeterReadingFormValues>
  fields: MeterReadingFormValues['rooms']
  onSubmit: (data: MeterReadingFormValues) => void
  isLoading: boolean
  isButtonDisabled: boolean
}
const MeterReadingFormField = ({
  form,
  fields,
  onSubmit,
  isLoading,
  isButtonDisabled,
}: IMeterReadingFormFieldProps) => {
  const { currentTab, setTab } = useTabQuery('cards')
  if (isLoading) {
    return (
      <PageTableEmpty
        message="Loading meter reading..."
        description="Please wait while we load the meter reading."
        icon={<Spinner />}
      />
    )
  }
  //empty unit
  if (fields.length === 0) {
    return (
      <PageTableSearchEmpty
        message="No units found"
        subMessage="Please add a unit to continue creating meter reading"
      />
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-4">
        <Tabs value={currentTab} onValueChange={setTab}>
          <TabsList className="desktop:w-1/4 w-full">
            <TabsTrigger value="cards">
              <LayoutGrid className="size-4" /> Cards
            </TabsTrigger>
            <TabsTrigger value="table">
              <Table className="size-4" /> Table
            </TabsTrigger>
          </TabsList>
          <TabsContent value="cards">
            <MeterReadingFormFieldCardsGroup form={form} fields={fields} />
          </TabsContent>
          <TabsContent value="table">
            <MeterReadingFormFieldTable form={form} fields={fields} />
          </TabsContent>
        </Tabs>

        {fields.length > 0 && (
          <div className="desktop:static desktop:px-0 fixed bottom-6 right-0 w-full px-4">
            <Button disabled={isButtonDisabled} block type="submit" className="flex items-center gap-2">
              <Save className="size-4" /> Save Meter Reading
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
}

export default MeterReadingFormField
