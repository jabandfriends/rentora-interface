import { Button, Spinner } from '@/components/common'
import type { Maybe } from '@/types'

type IContractButtonGroup = {
  handleCollapse: () => void
  buttonText: string
  isExporting: boolean
  documentUrl: Maybe<string>
  handleDownloadSignContractPDF: () => void
}
const ContractButtonGroup = ({
  handleCollapse,
  buttonText,
  isExporting,
  handleDownloadSignContractPDF,
  documentUrl,
}: IContractButtonGroup) => {
  return (
    <div className="desktop:flex-row mt-4 flex flex-col justify-between gap-y-2">
      <div className="flex items-center justify-end">
        <Button variant="secondary" className="desktop:w-auto w-full" onClick={handleCollapse}>
          {buttonText}
        </Button>
      </div>

      {!documentUrl && (
        <div className="flex items-center justify-end">
          <Button className="desktop:w-auto w-full" disabled={isExporting} onClick={handleDownloadSignContractPDF}>
            {isExporting ? <Spinner /> : 'Export Contract PDF (for signature)'}
          </Button>
        </div>
      )}
      {documentUrl && (
        <div className="flex items-center justify-end">
          <a href={documentUrl} download target="_blank" rel="noopener noreferrer">
            <Button className="desktop:w-auto w-full">Download Signed Contract</Button>
          </a>
        </div>
      )}
    </div>
  )
}

export default ContractButtonGroup
