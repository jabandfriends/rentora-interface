import { SquarePen } from 'lucide-react'

import { Badge, PaginationBar, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { ALL_ROOMS_TABLE_HEADER } from '@/constants'

//RECHECK : api type
type AllRoomsTableProps = {
    data: Array<any>
}
//RECHECK : API TYPE
const AllRoomsTable = ({ data }: AllRoomsTableProps) => {
    return (
        <div className="bg-theme-light flex flex-col gap-y-3 rounded-lg p-5">
            <Table>
                <TableHeader>
                    <TableRow>
                        {ALL_ROOMS_TABLE_HEADER.map((header: string) => (
                            <TableHead key={header}>{header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* RECHECK : API TYPE */}
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.roomno}</TableCell>
                            <TableCell>{item.buildings}</TableCell>
                            <TableCell>{item.resident}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.moveoutdate}</TableCell>
                            <TableCell>
                                <Badge variant="success">{item.status}</Badge>
                            </TableCell>

                            <TableCell>
                                <SquarePen size={20} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PaginationBar />
        </div>
    )
}

export default AllRoomsTable
