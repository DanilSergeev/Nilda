import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataItems } from "../../models/IDataItems";

const initialState: IDataItems = {
    id: 0,
    title: '',
    description: '',
    updatedAt: '',
    countryId: 0,
    categoryId: 0,
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
            state.categoryId = action.payload.categoryId;
            state.imageOfItems = action.payload.imageOfItems.length>0?action.payload.imageOfItems: [{id:0,url:"noimage.jpg"}];
        },
        unSetItem(state) {
            state.id = 0;
            state.title = '';
            state.description = '';
            state.updatedAt = '';
            state.countryId = 0;
            state.categoryId = 0;
            state.imageOfItems = [];
        }
    },
})

export default itemSlice.reducer;