import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common'
import { FieldEmpty } from '@/components/ui'

type IMaintenanceDescriptionProps = {
  description: string
}
const MaintenanceDescription = ({ description }: IMaintenanceDescriptionProps) => {
  return (
    <Card className="justify-start rounded-xl shadow-sm">
      <CardHeader className="items-center justify-between">
        <CardTitle>Description</CardTitle>
        <CardDescription className="text-theme-secondary-700 text-body-2">
          The description of the maintenance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-theme-secondary text-body-2">{description ? description : <FieldEmpty />}</p>
      </CardContent>
    </Card>
  )
}

export default MaintenanceDescription
