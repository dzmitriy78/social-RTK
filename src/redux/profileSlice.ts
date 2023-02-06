import {profileAPI} from "../api/api"
import {PostDataType} from "../components/Profile/MyPosts/MyPosts"
import {RootState} from "./store"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProfileType} from "../components/Profile/Profile";

export const getProfile = createAsyncThunk("profile/getProfile", async (arg: { userId: number }, thunkAPI) => {
    try {
        const res = await profileAPI.getProfile(arg.userId)
        return {profile: res}
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})
export const getStatus = createAsyncThunk("profile/getStatus", async (arg: { userId: number }, thunkAPI) => {
    try {
        const res = await profileAPI.getStatus(arg.userId)
        return {status: res}
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})
export const updateStatus = createAsyncThunk("profile/updateStatus", async (arg: { status: string }, thunkAPI) => {
    try {
        await profileAPI.updateStatus(arg.status)
        return {status: arg.status}
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})
export const savePhoto = createAsyncThunk("profile/savePhoto", async (arg: { file: File }, thunkAPI) => {
    try {
        const res = await profileAPI.updatePhoto(arg.file)
        return {photos: res.data.photos}
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})
export const saveProfile = createAsyncThunk("profile/saveProfile", async (arg: { profile: ProfileType }, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState
        const userId = state.auth.userId
        const res = await profileAPI.updateProfile(arg.profile)
        if (res.resultCode === 0 && userId) {
            await thunkAPI.dispatch(getProfile({userId}))
            thunkAPI.dispatch(setEditMode({editMode: false}))
            thunkAPI.dispatch(setError({error: ""}))
        } else {
            thunkAPI.dispatch(setError({error: res.messages[0]}))
        }
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})
const profileSlice = createSlice({
    name: "profile",
    initialState: {
        postData: [
            {id: 1, message: "Hi, how are you", likeCount: 15},
            {id: 2, message: "It's my first post", likeCount: 25},
            {id: 3, message: "Hi", likeCount: 1},
        ],
        profile: null,
        status: "",
        newPostText: "",
        error: "",
        editMode: false
    } as initialStateType,
    reducers: {
        addPost: (state, action: PayloadAction<{ text: string }>) => {
            let newPost: PostDataType = {
                id: Math.random(),
                message: action.payload.text,
                likeCount: 0
            }
            state.postData = [...state.postData, newPost]
            state.newPostText = ""
        },
        deletePost: (state, action: PayloadAction<{ postId: number }>) => {
            state.postData = state.postData.filter((p: { id: number }) => p.id !== action.payload.postId ? p : "")
        },
        setError: (state, action: PayloadAction<{ error: string }>) => {
            state.error = action.payload.error
        },
        setEditMode: (state, action: PayloadAction<{ editMode: boolean }>) => {
            state.editMode = action.payload.editMode
        }
    },
    extraReducers: builder => {
        builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<{ profile: ProfileType }>) => {
            state.profile = action.payload.profile
        })
        builder.addCase(getStatus.fulfilled, (state, action: PayloadAction<{ status: string }>) => {
            state.status = action.payload.status
        })
        builder.addCase(updateStatus.fulfilled, (state, action: PayloadAction<{ status: string }>) => {
            state.status = action.payload.status
        })
        builder.addCase(savePhoto.fulfilled, (state, action: PayloadAction<{ photos: { small: string, large: string } }>) => {
            if (state.profile)
                state.profile.photos = action.payload.photos
        })
    }
})

export const {addPost, deletePost, setError, setEditMode} = profileSlice.actions

type initialStateType = {
    postData: PostDataType[]
    profile: ProfileType | null
    status: string | ""
    newPostText: string
    error: string | ""
    editMode: boolean
}
export default profileSlice.reducer