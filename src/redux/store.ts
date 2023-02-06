import profileSlice from "./profileSlice";
import thunkMiddleware from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import initialSlice from "./initialSlice";
import authSlice from "./authSlice";
import messageSlice from "./messageSlice";
import sidebarSlice from "./sidebarSlice";
import usersSlice from "./usersSlice";

export const store = configureStore({
    reducer: {
        profilePage: profileSlice,
        messagePage: messageSlice,
        usersPage: usersSlice,
        sidebar: sidebarSlice,
        auth: authSlice,
        initial: initialSlice,
        chat: chatSlice
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch