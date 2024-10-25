import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AlertSlice from "./reducers/AlertSlice";
import ModalSlice from "./reducers/ModalSlice";
import AuthSlice from "./reducers/AuthSlice";
import IdeaSlice from "./reducers/IdeaSlice";
import IdeasSlice from "./reducers/IdeasSlice";


const rootReducers = combineReducers({
    AlertSlice,
    ModalSlice,
    AuthSlice,
    IdeaSlice,
    IdeasSlice,
})
export const setupStore= ()=>{
    return configureStore({
        reducer: rootReducers,
    })
}
export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']