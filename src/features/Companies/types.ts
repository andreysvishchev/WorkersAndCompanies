import { StatusType } from "../../shared/types/types.ts"

export interface CompaniesStateSchema {
    companies: CompanyData[]
    status: StatusType
    activeAll: boolean
}

export interface CompanyData {
    name: string
    selected: boolean
    address: string
    id: string
    quantity: number
}
