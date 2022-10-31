import {authMe} from "./auth-reducer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initial = createAsyncThunk("initial/initial", async (arg, thunkAPI) => {
    try {
        let promise = thunkAPI.dispatch(authMe())
        await Promise.all([promise])
        thunkAPI.dispatch(setInitialData())
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "initial",
    initialState: {
        initialize: false
    },
    reducers: {
        setInitialData: (state) => {
            state.initialize = true
        }
    }
})

export const initialReducer = slice.reducer
export const {setInitialData} = slice.actions