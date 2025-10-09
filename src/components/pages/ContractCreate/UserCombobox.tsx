import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import { Button, Input } from '@/components/common'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/feature'
import type { ITenant } from '@/types'
import { cn } from '@/utilities'

type IMonthlyUserComboboxProps = {
  users: Array<ITenant>
  onSearchTenant: (query: string) => void
  onSelectTenant: (userId: string, name: string) => void
}

const MonthlyUserCombobox = ({ users, onSearchTenant, onSelectTenant }: IMonthlyUserComboboxProps) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="flex items-center">
          {value ? users.find((user) => user.userId === value)?.fullName : 'Select user...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="bg-theme-light w-[250px] rounded-xl p-0 shadow">
        <Command>
          {/* Controlled input */}
          <Input placeholder="Search user..." className="h-9" onChange={(e) => onSearchTenant(e.target.value)} />

          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.userId}
                  value={user.userId}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                    onSelectTenant(currentValue, user.fullName)
                  }}
                >
                  {user.fullName}
                  <Check className={cn('ml-auto', value === user.userId ? 'opacity-100' : 'opacity-0')} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default MonthlyUserCombobox
