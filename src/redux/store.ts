import {combineReducers} from "redux";
import {profileReducer} from "./profile-reducer";
import {messageReducer} from "./message-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {usersReducer} from "./users-reducer";
import {authReducer} from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {initialReducer} from "./initial-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector} from "react-redux";

let rootReducer = combineReducers(
    {
        profilePage: profileReducer,
        messagePage: messageReducer,
        usersPage: usersReducer,
        sidebar: sidebarReducer,
        auth: authReducer,
        initial: initialReducer
    }
)

const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export default store;

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
export type AppStateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch