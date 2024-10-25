import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataIdeas } from "../../models/IDataIdeas";

const initialState: IDataIdeas = {
    id: 0,
    title: '',
    text: '',
    createdAt: '',
    updatedAt: '',
}

export const ideaSlice = createSlice({
    name: 'idea',
    initialState,
    reducers: {
        setIdea(state, action: PayloadAction<IDataIdeas>) {
            state.id = action.payload.id;
            state.title = action.payload.title;
            state.text = action.payload.text;
            state.updatedAt = action.payload.updatedAt;
        },
        unSetIdea(state) {
            state.id = 0;
            state.title = '';
            state.text = '';
            state.updatedAt = '';
        }
    },
})

export default ideaSlice.reducer;