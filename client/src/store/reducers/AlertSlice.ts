import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlert } from "../../models/IAlert";

const initialState: IAlert = {
    variant: 'success',
    show: false,
    text: ''
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert(state, action: PayloadAction<IAlert>) {
            state.show = true;
            state.variant = action.payload.variant;
            state.text = action.payload.text;
        },
        hideAlert(state) {
            state.show = false;
        }
    },
})

export default alertSlice.reducer;