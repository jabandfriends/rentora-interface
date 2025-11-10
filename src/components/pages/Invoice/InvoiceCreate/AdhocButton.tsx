import { Button } from '@/components/common'

type IAdhocButton = {
    onSubmit: () => void
}
const AdhocButton = ({ onSubmit }: IAdhocButton) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <Button type="button" onClick={onSubmit}>
                    Create Adhoc Invoice
                </Button>
            </div>
        </>
    )
}

export default AdhocButton
