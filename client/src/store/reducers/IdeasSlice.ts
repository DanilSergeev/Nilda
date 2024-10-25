import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataIdeas } from "../../models/IDataIdeas";

interface IdeasState {
    ideas: IDataIdeas[];
}

const initialState: IdeasState = {
    ideas: [],
};

export const ideasSlice = createSlice({
    name: 'ideas',
    initialState,
    reducers: {
        setIdeas(state, action: PayloadAction<IDataIdeas[]>) {
            state.ideas = action.payload;
        },
        updateIdeas(state, action: PayloadAction<IDataIdeas>) {
            const index = state.ideas.findIndex(idea => idea.id === action.payload.id);
            if (index !== -1) {
                state.ideas[index] = {
                    ...state.ideas[index],
                    ...action.payload,
                    updatedAt: new Date().toISOString() 
                };
            }
        },
        addIdea(state, action: PayloadAction<IDataIdeas>) {
            state.ideas.push(action.payload);
        },
        removeIdeas(state, action: PayloadAction<number>) {
            state.ideas = state.ideas.filter(idea => idea.id !== action.payload);
        },
    },
});


export default ideasSlice.reducer;