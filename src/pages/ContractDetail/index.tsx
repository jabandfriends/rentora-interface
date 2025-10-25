import { PageSection } from '@/components/layout'
import ContractDetailBody from '@/components/pages/ContractDetail/ContractDetailBody'
import ContractDetailBreadcrumb from '@/components/pages/ContractDetail/ContractDetailBreadcrumb'

const ContractDetail = () => {
    return (
        <PageSection>
            <ContractDetailBreadcrumb />
            <ContractDetailBody />
        </PageSection>
    )
}

export default ContractDetail
