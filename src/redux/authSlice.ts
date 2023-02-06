import {myAPI, securityAPI} from "../api/api";

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const authMe = createAsyncThunk("auth/authMe", async (arg, thunkAPI) => {
    try {
        const data = await myAPI.authMe()
        if (data.resultCode === 0) {
            const {id, email, login} = data.data
            thunkAPI.dispatch(setAuthUserData({userId: id, email, login, isAuth: true}))
        }
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})

export const login = createAsyncThunk("auth/login",
    async (arg: { email: string, password: string, rememberMe: boolean, captcha: string, setStatus: (status: string) => void }, thunkAPI) => {
        try {
            const data = await myAPI.login(arg.email, arg.password, arg.rememberMe, arg.captcha)
            if (data.resultCode === 0) {
                thunkAPI.dispatch(authMe())
            } else {
                if (data.resultCode === 10) {
                    thunkAPI.dispatch(getCaptcha())
                }
                arg.setStatus(data.messages.join(" "))
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(null)
        }
    })
export const logout = createAsyncThunk("auth/logout", async (arg, thunkAPI) => {
    try {
        const data = await myAPI.logout()
        if (data.resultCode === 0) {
            thunkAPI.dispatch(setAuthUserData({userId: null, email: null, login: null, isAuth: false}))
        }
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})

export const getCaptcha = createAsyncThunk("auth/getCaptcha", async (arg, thunkAPI) => {
    try {
        const data = await securityAPI.captcha()
        thunkAPI.dispatch(setCaptcha({captchaUrl: data.url}))
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: null,
        email: null,
        login: null,
        isAuth: false,
        captchaUrl: null
    } as InitialStateType,
    reducers: {
        setAuthUserData: (state, action: PayloadAction<{ userId: number | null, email: string | null, login: string | null, isAuth: boolean }>) => {
            state.userId = action.payload.userId
            state.isAuth = action.payload.isAuth
            state.login = action.payload.login
        },
        setCaptcha: (state, action: PayloadAction<{ captchaUrl: string }>) => {
            state.captchaUrl = action.payload.captchaUrl
        }
    }

})

export const {setAuthUserData, setCaptcha} = authSlice.actions
export default authSlice.reducer

type InitialStateType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
