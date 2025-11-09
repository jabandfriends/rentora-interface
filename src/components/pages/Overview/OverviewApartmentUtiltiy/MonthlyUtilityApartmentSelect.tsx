import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { LoadingPage, PageTableEmpty } from '@/components/ui'
import { useRentoraApiApartmetUtility } from '@/hooks'
import type { IYearlyApartmentUtility } from '@/types'

import MonthlyUtilityApartmentCard from './MonthlyUtilityApartmentCard'

type IYearlySelectProps = {
    item?: Array<IYearlyApartmentUtility>
    isLoading: boolean
}

const MonthlyUtilityApartmentSelect = ({ item, isLoading }: IYearlySelectProps) => {
    const { apartmentId } = useParams<{ apartmentId: string }>()

    const [selectedYear, setSelectedYear]: [string, Dispatch<SetStateAction<string>>] = useState('')

    useEffect(() => {
        if (item && item.length > 0 && selectedYear === '') {
            setSelectedYear(String(item[0].year))
        }
    }, [item, selectedYear])

    const { data: monthlySummary, isLoading: isLoadingSummary } = useRentoraApiApartmetUtility({
        apartmentId: apartmentId!,
        params: {
            year: Number(selectedYear),
        },
    })

    if (isLoading || isLoadingSummary) {
        return <LoadingPage />
    }

    if (!item || item.length === 0) {
        return <PageTableEmpty message="No historical data found to select a year." />
    }

    return (
        <div className="justify-center space-y-4 rounded-2xl">
            <div>
                <Select value={selectedYear} onValueChange={(value) => setSelectedYear(value)}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select Year" />
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

            {monthlySummary && selectedYear && (
                <MonthlyUtilityApartmentCard
                    item={monthlySummary}
                    isLoading={isLoadingSummary}
                    props={{
                        year: Number(selectedYear),
                    }}
                />
            )}
        </div>
    )
}

export default MonthlyUtilityApartmentSelect
