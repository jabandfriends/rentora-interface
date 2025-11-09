import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useParams } from 'react-router-dom'
import { number } from 'zod'

import { LoadingPage, PageTableEmpty } from '@/components/ui'
import { useRentoraApiApartmetUtility, useRentoraApiApartmetUtiliyy } from '@/hooks'
import { useRentoraApiYearlyApartmentUtility } from '@/hooks/api/queries/useRentoraApiYearlyApartmentUtility'
import type { IApartmentUtility, IYearlyApartmentUtility } from '@/types'

import MonthlyUtilityApartmentCard from './MonthlyUtilityApartmentCard'

type IYearlySelect = {
    item?: Array<IYearlyApartmentUtility>
    isLoading: boolean
}

const MonthlyUtilityApartmentSelect = ({ item, isLoading }: IYearlySelect) => {
    const [selectedYear, setSelectedYear]: [string, Dispatch<SetStateAction<string>>] = useState('')

    const { apartmentId } = useParams<{ apartmentId: string }>()
    const { data: monthlyApartmentUtility, isLoading: boolean } = useRentoraApiApartmetUtility({
        apartmentId: apartmentId!,
        params: {
            year: selectedYear,
        },
    })
    if (isLoading) {
        return <LoadingPage />
    }

    if (!item || item.length === 0) {
        return <PageTableEmpty message="No Floor found" />
    }

    if (selectedYear === '' && item.length > 0) {
        setSelectedYear(String(item[0].year))
    }

    return (
        <div className="justify-center space-y-4 rounded-2xl">
            <div>
                <Select value={selectedYear} onValueChange={(value) => setSelectedYear(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select floor Number" />
                    </SelectTrigger>
                    <SelectContent>
                        {item.map((yearSummary: IYearlyApartmentUtility) => (
                            <SelectItem key={yearSummary.year} value={String(yearSummary.year)}>
                                <div className="flex items-center gap-2">
                                    <span>{yearSummary.year}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                {monthlyApartmentUtility?.map((item: IApartmentUtility, index: number) => (
                    <MonthlyUtilityApartmentCard key={index} item={item} isLoading={isLoading} props={number(selectedYear)} />
                ))}
            </div>
        </div>
    )
}

export default MonthlyUtilityApartmentSelect
