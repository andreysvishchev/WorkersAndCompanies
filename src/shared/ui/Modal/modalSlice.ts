import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ModalState {
    modalName: string
}

const initialState: ModalState = {
    modalName: ""
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    selectors: {
        getModalName: (sliceState) => sliceState.modalName
    },
    reducers: {
        openModal: (state, action: PayloadAction<string>) => {
            state.modalName = action.payload
        },

        closeModal: (state) => {
            state.modalName = ""
        }
    }
})

export const { getModalName } = modalSlice.selectors
export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
