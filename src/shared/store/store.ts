import { configureStore } from "@reduxjs/toolkit"
import companiesReducer from "../../features/Companies/companiesSlice.ts"
import workersReducer from "../../features/Workers/workersSlice.ts"
import modalReducer from "../../shared/ui/Modal/modalSlice.ts"

export const makeStore = () => {
    return configureStore({
        reducer: {
            companies: companiesReducer,
            workers: workersReducer,
            modal: modalReducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
