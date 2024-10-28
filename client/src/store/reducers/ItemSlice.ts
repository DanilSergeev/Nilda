import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataItems } from "../../models/IDataItems";

const initialState: IDataItems = {
    id: 0,
    title: '',
    description: '',
    updatedAt: '',
    countryId: 0,
    imageOfItems: [],
}

export const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setItem(state, action: PayloadAction<IDataItems>) {
            state.id = action.payload.id;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.updatedAt = action.payload.updatedAt;
            state.countryId = action.payload.countryId;
            state.imageOfItems = action.payload.imageOfItems;
        },
        unSetItem(state) {
            state.id = 0;
            state.title = '';
            state.description = '';
            state.updatedAt = '';
            state.countryId = 0;
            state.imageOfItems = [];
        }
    },
})

export default itemSlice.reducer;