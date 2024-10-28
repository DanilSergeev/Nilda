import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataItems } from "../../models/IDataItems";

interface IitemsState {
    data: IDataItems[];
}

const initialState: IitemsState = {
    data: [],
};

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<IDataItems[]>) {
            state.data = action.payload;
        },
        updateItems(state, action: PayloadAction<IDataItems>) {
            const index = state.data.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = {
                    ...state.data[index],
                    ...action.payload,
                    updatedAt: new Date().toISOString() 
                };
            }
        },
        addItems(state, action: PayloadAction<IDataItems>) {
            state.data.push(action.payload);
        },
        removeItems(state, action: PayloadAction<number>) {
            state.data = state.data.filter(item => item.id !== action.payload);
        },
    },
});


export default itemsSlice.reducer;