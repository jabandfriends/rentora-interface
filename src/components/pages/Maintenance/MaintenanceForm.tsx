import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Button,
  Card,
  Form,
  FormField,
  FormMessage,
  Input,
  InputNumber,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/common'
import { DateTimePicker } from '@/components/common/DateTimePicker'

const MaintenanceFormSchema = z.object({
  unit_id: z.string({ error: 'Room number is required.' }).min(1, 'Room number is required.'),
  title: z.string({ error: 'Task title is required.' }).optional(),
  description: z.string({ error: 'Task description is required.' }).min(1, 'Task description is required.'),
  status: z.string({ error: 'Task status is required.' }).min(1, 'Task status is required.'),
  priority: z.string({ error: 'Task priority is required.' }).min(1, 'Task priority is required.'),
  appointment_date: z.string({ error: 'Appointment date is required.' }).min(1, 'Appointment date is required.'),
  due_date: z.string({ error: 'Due date is required.' }).optional(),
  estimated_hours: z.string().optional(),
})

const MaintenanceForm = () => {
  const form = useForm({
    resolver: zodResolver(MaintenanceFormSchema),
    defaultValues: {
      unit_id: '',
      title: '',
      description: '',
      status: '',
      priority: '',
      appointment_date: '',
      due_date: '',
      estimated_hours: '',
    },
  })
  const onSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Task Detail */}
        <Card className="space-y-4 rounded-xl px-6 py-4 hover:shadow-none">
          <div>
            <h3>Task Detail</h3>
            <p className="text-theme-secondary">Basic information about the maintenance task</p>
          </div>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <div>
                  <p>Title</p>
                  <Input {...field} placeholder="Enter task title" />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <div>
                  <p>Description</p>
                  <Textarea {...field} placeholder="Enter task description" />
                  <FormMessage />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <div>
                  <p>Priority</p>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              )}
            />
          </div>
        </Card>

        {/* Scheduling */}
        <Card className="desktop:grid-cols-2 grid gap-x-4 space-y-4 rounded-xl px-6 py-4 hover:shadow-none">
          <div className="space-y-4">
            <div>
              <h3>Scheduling</h3>
              <p className="text-theme-secondary">When and how often this task should be completed</p>
            </div>
            <div className="space-y-2">
              <div className="desktop:flex-row flex flex-col gap-x-4">
                <FormField
                  control={form.control}
                  name="appointment_date"
                  render={({ field }) => (
                    <div className="flex-1">
                      <p>Appointment date</p>
                      <DateTimePicker
                        onChange={(val) => field.onChange(val?.toISOString())}
                        onBlur={field.onBlur}
                        name={field.name}
                        required
                      />
                      <FormMessage />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <div className="flex-1">
                      <p>Due date</p>
                      <DateTimePicker
                        onChange={(val) => field.onChange(val?.toISOString())}
                        onBlur={field.onBlur}
                        name={field.name}
                        required
                      />
                      <FormMessage />
                    </div>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="estimated_hours"
                render={({ field }) => (
                  <div>
                    <p>Estimated hours</p>
                    <InputNumber {...field} placeholder="Enter estimated hours" />
                    <FormMessage />
                  </div>
                )}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <div>
              <h3>Location</h3>
              <p className="text-theme-secondary">Select the room where this task should be completed</p>
            </div>
            <div className="space-y-2">
              <FormField
                name="unit_id"
                control={form.control}
                render={({ field }) => (
                  <div>
                    <p>Room number</p>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a room" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="room1">Room 1</SelectItem>
                        <SelectItem value="room2">Room 2</SelectItem>
                        <SelectItem value="room3">Room 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                )}
              />
            </div>
          </div>
        </Card>
        <div className="flex justify-end">
          <Button className="flex items-center gap-2" type="submit">
            <Plus /> Add Task
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default MaintenanceForm
