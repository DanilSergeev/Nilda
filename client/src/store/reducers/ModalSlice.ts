import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModal } from "../../models/IModal";

const initialState: IModal = {
    show: false,
    title: '',
    text: ''
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal(state, action: PayloadAction<IModal>) {
            state.show = true;
            state.title = action.payload.title;
            state.text = action.payload.text;
        },
        hideModal(state) {
            state.show = false;
        }
    },
})

export default modalSlice.reducer;