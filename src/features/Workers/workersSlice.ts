import type { PayloadAction } from "@reduxjs/toolkit"
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"
import { randomInteger } from "../../shared/helpers/randomInteger.ts"
import { WorkerData, WorkersStateSchema } from "./types.ts"
import mockData from "./mockData.json"
import { getPaginationData } from "../../shared/helpers/getPaginationData.ts"

const createAppSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
})

const initialState: WorkersStateSchema = {
    workers: [],
    status: "loading",
    activeAll: false,
    pagination: {
        page: 0,
        pageCount: 0,
        items: []
    }
}

export const WorkersSlice = createAppSlice({
    name: "workers",
    initialState,
    selectors: {
        getWorkers: (sliceState) => sliceState.workers,
        getPagination: (sliceState) => sliceState.pagination,
        getActiveAllStatus: (sliceState) => sliceState.activeAll
    },
    reducers: (create) => ({
        removeWorker: create.reducer((state, action: PayloadAction<{ id: number }>) => {
            state.workers = state.workers.filter((el) => el.id !== action.payload.id)
            state.pagination.items = state.pagination.items.filter((el) => el.id !== action.payload.id)
        }),
        addNewWorker: create.reducer(
            (
                state,
                action: PayloadAction<{
                    lastName: string
                    firstName: string
                    post: string
                    company: string
                    companyId: string
                }>
            ) => {
                const newWorker = {
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    post: action.payload.post,
                    selected: false,
                    id: randomInteger(2000, 3000),
                    company: action.payload.company,
                    companyId: action.payload.companyId
                }
                state.pagination.items = [newWorker, ...state.pagination.items]
                state.workers = [newWorker, ...state.workers]
            }
        ),
        changeCompanyNameForWorkers: create.reducer((state, action: PayloadAction<{ id: string; name: string }>) => {
            state.workers = state.workers.map((el) =>
                el.companyId === action.payload.id
                    ? {
                          ...el,
                          company: action.payload.name
                      }
                    : el
            )

            state.pagination.items = state.pagination.items.map((el) =>
                el.companyId === action.payload.id
                    ? {
                          ...el,
                          company: action.payload.name
                      }
                    : el
            )
        }),
        changeFirstNameWorker: create.reducer((state, action: PayloadAction<{ id: number; name: string }>) => {
            const index = state.workers.findIndex((el) => el.id === action.payload.id)
            state.workers[index].firstName = action.payload.name

            const indexForPagination = state.pagination.items.findIndex((el) => el.id === action.payload.id)
            state.pagination.items[indexForPagination].firstName = action.payload.name
        }),
        changeLastNameWorker: create.reducer((state, action: PayloadAction<{ id: number; name: string }>) => {
            const index = state.workers.findIndex((el) => el.id === action.payload.id)
            state.workers[index].lastName = action.payload.name

            const indexForPagination = state.pagination.items.findIndex((el) => el.id === action.payload.id)
            state.pagination.items[indexForPagination].lastName = action.payload.name
        }),
        selectWorker: create.reducer((state, action: PayloadAction<{ id: number }>) => {
            const index = state.workers.findIndex((el) => el.id === action.payload.id)
            state.workers[index].selected = !state.workers[index].selected

            const indexForPagination = state.pagination.items.findIndex((el) => el.id === action.payload.id)
            state.pagination.items[indexForPagination].selected = !state.pagination.items[indexForPagination].selected

            state.activeAll = false
        }),
        toggleAllWorkers: create.reducer((state, action: PayloadAction<boolean>) => {
            state.workers = state.workers.map((el) => ({ ...el, selected: action.payload }))
            state.pagination.items = state.pagination.items.map((el) => ({ ...el, selected: action.payload }))
            state.activeAll = action.payload
        }),
        showSelectedWorkers: create.reducer((state, action: PayloadAction<{ id: string }>) => {
            const allWorkers: WorkerData[] = mockData.workers
            const filteredWorkers = allWorkers.filter((el) => el.companyId === action.payload.id)
            state.workers = state.workers.concat(filteredWorkers)
            state.pagination = getPaginationData<WorkerData>(state.pagination.items.concat(filteredWorkers), 1)
        }),
        hideSelectedWorkers: create.reducer((state, action: PayloadAction<{ id: string }>) => {
            const filteredWorkers = state.workers.filter((el) => el.companyId !== action.payload.id)
            state.workers = filteredWorkers
            state.pagination = getPaginationData<WorkerData>(filteredWorkers, 1)
        }),
        removerSelectedWorkers: create.reducer((state) => {
            state.workers = state.workers.filter((el) => !el.selected)
            state.pagination.items = state.pagination.items.filter((el) => !el.selected)
        }),
        getMoreWorkers: create.reducer((state, action: PayloadAction<number>) => {
            const pagination = getPaginationData<WorkerData>(state.workers, action.payload)
            state.pagination = {
                page: pagination.page,
                pageCount: pagination.pageCount,
                items: state.pagination.items.concat(pagination.items)
            }
        }),
        showAllWorkers: create.reducer((state) => {
            state.workers = mockData.workers
            state.pagination = getPaginationData<WorkerData>(mockData.workers, 1)
        }),
        hideAllWorkers: create.reducer((state) => {
            state.pagination = { page: 0, pageCount: 0, items: [] }
            state.workers = []
        })
    })
})

export const {
    showSelectedWorkers,
    showAllWorkers,
    hideAllWorkers,
    selectWorker,
    hideSelectedWorkers,
    addNewWorker,
    changeFirstNameWorker,
    changeLastNameWorker,
    removeWorker,
    toggleAllWorkers,
    removerSelectedWorkers,
    changeCompanyNameForWorkers,
    getMoreWorkers
} = WorkersSlice.actions

export const { getWorkers, getPagination, getActiveAllStatus } = WorkersSlice.selectors
export default WorkersSlice.reducer
