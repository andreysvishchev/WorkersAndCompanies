import { asyncThunkCreator, buildCreateSlice, PayloadAction } from "@reduxjs/toolkit"
import { CompaniesStateSchema, CompanyData } from "./types.ts"
import mockData from "./mockData.json"

const createAppSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
})

const initialState: CompaniesStateSchema = {
    companies: [],
    activeAll: false,
    status: "loading"
}

export const companiesSlice = createAppSlice({
    name: "companies",
    initialState,
    selectors: {
        getCompanies: (sliceState) => sliceState.companies,
        getCompaniesStatus: (sliceState) => sliceState.status,
        getActiveAllStatus: (sliceState) => sliceState.activeAll
    },
    reducers: (create) => ({
        addNewCompany: create.reducer((state, action: PayloadAction<{ name: string; address: string }>) => {
            const newCompany = {
                name: action.payload.name,
                selected: false,
                address: action.payload.address,
                quantity: 0,
                id: new Date().toLocaleDateString()
            }
            state.companies = [...state.companies, newCompany]
        }),
        removeSelectedCompany: create.reducer((state) => {
            state.companies = state.companies.filter((el) => !el.selected)
        }),
        changeNameCompany: create.reducer((state, action: PayloadAction<{ id: string; name: string }>) => {
            const index = state.companies.findIndex((el) => el.id === action.payload.id)
            state.companies[index].name = action.payload.name
        }),
        changeAddressCompany: create.reducer((state, action: PayloadAction<{ id: string; address: string }>) => {
            const index = state.companies.findIndex((el) => el.id === action.payload.id)
            state.companies[index].address = action.payload.address
        }),
        selectCompany: create.reducer((state, action: PayloadAction<{ id: string }>) => {
            const index = state.companies.findIndex((el) => el.id === action.payload.id)
            state.companies[index].selected = !state.companies[index].selected
            state.activeAll = false
        }),
        toggleAllCompanies: create.reducer((state, action: PayloadAction<boolean>) => {
            state.companies = state.companies.map((el) => ({ ...el, selected: action.payload }))
            state.activeAll = action.payload
        }),
        changeQuantityWorkers: create.reducer((state, action: PayloadAction<{ id: string; length: number }>) => {
            const index = state.companies.findIndex((el) => el.id === action.payload.id)
            state.companies[index].quantity = action.payload.length
        }),
        removeAllWorkers: create.reducer((state) => {
            if (state.activeAll) state.companies = state.companies.map((el) => ({ ...el, quantity: 0 }))
        }),
        initState: create.asyncThunk(
            async (_: void) => {
                const data: CompanyData[] = mockData.companies
                return data
            },
            {
                pending: (state) => {
                    state.status = "loading"
                },
                fulfilled: (state, action) => {
                    state.companies = action.payload
                },
                rejected: () => {
                    throw new Error("error in response")
                },
                settled: (state) => {
                    state.status = "idle"
                }
            }
        )
    })
})

export const {
    selectCompany,
    initState,
    toggleAllCompanies,
    removeSelectedCompany,
    changeNameCompany,
    changeQuantityWorkers,
    addNewCompany,
    changeAddressCompany,
    removeAllWorkers
} = companiesSlice.actions

export const { getCompanies, getCompaniesStatus, getActiveAllStatus } = companiesSlice.selectors

export default companiesSlice.reducer
