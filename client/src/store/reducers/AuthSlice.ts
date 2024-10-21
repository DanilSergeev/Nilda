import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "../../models/IAuth";

const initialState: IAuth = {
    id: 0,
    email: "",
    name: "",
    isActivated: false,
    role: "USER",
    isAuth: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser(state, action: PayloadAction<{ accessToken: string; user: IAuth }>) {
            try {
                localStorage.setItem("token", action.payload.accessToken);
                const { id, email, name, isActivated, role } = action.payload.user;
                state.id = id;
                state.email = email;
                state.name = name;
                state.isActivated = isActivated;
                state.role = role;
                state.isAuth = true;
            } catch (error: any) {
                console.error(error?.message);
            }
        },
        checkAuth(state, action: PayloadAction<{ tokens: { accessToken: string }; userDto: IAuth }>) {
            try {
                localStorage.setItem("token", action.payload.tokens.accessToken);
                const { id, email, name, isActivated, role } = action.payload.userDto;
                state.id = id;
                state.email = email;
                state.name = name;
                state.isActivated = isActivated;
                state.role = role;
                state.isAuth = true;
            } catch (error: any) {
                console.error(error?.message);
            }
        },
        logout(state) {
            try {
                localStorage.removeItem("token");
                state.id = 0;
                state.email = "";
                state.name = "";
                state.isActivated = false;
                state.role = "USER";
                state.isAuth = false;
            } catch (error: any) {
                console.error(error?.message);
            }
        },

    },
})

export default authSlice.reducer;