import { StatusType } from "../../shared/types/types.ts"

export interface WorkersStateSchema {
    workers: WorkerData[]
    status: StatusType
    activeAll: boolean
    pagination: {
        page: number
        pageCount: number
        items: WorkerData[]
    }
}

export interface WorkerData {
    firstName: string
    lastName: string
    post: string
    selected: boolean
    id: number
    company: string
    companyId: string
}
