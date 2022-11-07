import {usersAPI} from "../api/api"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "../components/Users/User";

export const getUsers = createAsyncThunk("users/getUsers", async (arg: { currentPage: number, pageSize: number, term: string, friend: null | boolean }, thunkAPI) => {
    try {
        thunkAPI.dispatch(toggleFetching({isFetching: true}))
        let data = await usersAPI.getUsers(arg.currentPage, arg.pageSize, arg.term, arg.friend)
        thunkAPI.dispatch(toggleFetching({isFetching: false}));
        thunkAPI.dispatch(setTotalUsersCount({totalCount: data.totalCount}))
        thunkAPI.dispatch(setFilter({filter:{term: arg.term, friend: arg.friend}}))
        return {users: data.items}
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})
export const following = createAsyncThunk("users/following", async (arg: { userId: number }, thunkAPI) => {
    try {
        thunkAPI.dispatch(toggleFollowingInProgress({isFetching: true, userId: arg.userId}))
        await usersAPI.followUser(arg.userId)
        thunkAPI.dispatch(toggleFollowingInProgress({isFetching: false, userId: arg.userId}))
        return {userId: arg.userId}
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})
export const unfollowing = createAsyncThunk("users/unfollowing", async (arg: { userId: number }, thunkAPI) => {
    try {
        thunkAPI.dispatch(toggleFollowingInProgress({isFetching: true, userId: arg.userId}))
        await usersAPI.unfollowUser(arg.userId)
        thunkAPI.dispatch(toggleFollowingInProgress({isFetching: false, userId: arg.userId}))
        return {userId: arg.userId}
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})

const slice = createSlice({
    name: "users",
    initialState: {
        users: [] as UserType[],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [],
        filter: {
            term: "",
            friend: null
        }
    } as initialStateType,
    reducers: {
        toggleFetching: (state, action: PayloadAction<{ isFetching: boolean }>) => {
            state.isFetching = action.payload.isFetching
        },
        setTotalUsersCount: (state, action: PayloadAction<{ totalCount: number }>) => {
            state.totalUsersCount = action.payload.totalCount
        },
        toggleFollowingInProgress: (state, action: PayloadAction<{ isFetching: boolean, userId: number }>) => {
            state.followingInProgress = action.payload.isFetching
                ? [...state.followingInProgress, action.payload.userId]
                : state.followingInProgress.filter(id => id !== action.payload.userId)
        },
        setCurrentPage: (state, action: PayloadAction<{ currentPage: number }>) => {
            state.currentPage = action.payload.currentPage
        },
        setFilter: (state, action: PayloadAction<{ filter: { term: string, friend: null | boolean } }>) => {
            state.filter = action.payload.filter
        }
    },
    extraReducers: builder => {
        builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<{ users: Array<UserType> }>) => {
            state.users = action.payload.users
        })
        builder.addCase(following.fulfilled, (state, action: PayloadAction<{ userId: number }>) => {
            state.users = state.users.map((u) => {
                return u.id === action.payload.userId ? {...u, followed: !u.followed} : u
            })
        })
        builder.addCase(unfollowing.fulfilled, (state, action: PayloadAction<{ userId: number }>) => {
            state.users = state.users.map((u) => {
                return u.id === action.payload.userId ? {...u, followed: !u.followed} : u
            })
        })
    }
})

export const usersReducer = slice.reducer
export const {toggleFetching, setTotalUsersCount, toggleFollowingInProgress, setCurrentPage, setFilter} = slice.actions

type initialStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
    filter: {
        term: string,
        friend: null | boolean
    }
}