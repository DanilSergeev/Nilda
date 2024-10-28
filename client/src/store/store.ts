import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AlertSlice from "./reducers/AlertSlice";
import ModalSlice from "./reducers/ModalSlice";
import AuthSlice from "./reducers/AuthSlice";
import IdeaSlice from "./reducers/IdeaSlice";
import IdeasSlice from "./reducers/IdeasSlice";
import ItemSlice from "./reducers/ItemSlice";
import ItemsSlice from "./reducers/ItemsSlice";


const rootReducers = combineReducers({
    AlertSlice,
    ModalSlice,
    AuthSlice,
    IdeaSlice,
    IdeasSlice,
    ItemSlice,
    ItemsSlice,
})
export const setupStore= ()=>{
    return configureStore({
        reducer: rootReducers,
    })
}
export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']