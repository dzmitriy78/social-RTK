import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chatAPI";
import {v1} from "uuid"

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
let _statusChangedHandler: ((status: StatusType) => void) | null = null
const newMessageHandlerCreator = (dispatch: (arg0: { payload: { messages: ChatMessageAPIType[] }; type: "chat/messagesReceived" }) => void) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived({messages}))
        }
    }
    return _newMessageHandler
}
const statusChangedHandlerCreator = (dispatch: (arg0: { payload: { status: StatusType }; type: "chat/statusChanged" }) => void) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(statusChanged({status}))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = createAsyncThunk("chat/startMessageListening", async (arg, thunkAPI) => {
    try {
        chatAPI.start()
        await chatAPI.subscribe("message-received", newMessageHandlerCreator(thunkAPI.dispatch))
        await chatAPI.subscribe("status-changed", statusChangedHandlerCreator(thunkAPI.dispatch))
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})
export const stopMessagesListening = createAsyncThunk("chat/stopMessageListening", async (arg, thunkAPI) => {
    try {
        chatAPI.unsubscribe("message-received", newMessageHandlerCreator(thunkAPI.dispatch))
        chatAPI.unsubscribe("status-changed", statusChangedHandlerCreator(thunkAPI.dispatch))
        chatAPI.stop()
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})
export const sendMessage = createAsyncThunk("chat/sendMessage", async (arg: { message: string }, thunkAPI) => {
    try {  
        chatAPI.sendMess(arg.message)
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})


const chatSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [] as ChatMessageType[],
        status: "pending" as StatusType
    },
    reducers: {
        messagesReceived: (state, action: PayloadAction<{ messages: ChatMessageAPIType[] }>) => {
            state.messages = [...state.messages, ...action.payload.messages.map(m => ({
                ...m,
                id: v1()
            }))].filter((m, i, array) => i >= array.length - 60)
        },
        statusChanged: (state, action: PayloadAction<{ status: StatusType }>) => {
            state.status = action.payload.status
        }
    }
})


export const {messagesReceived, statusChanged} = chatSlice.actions
export default chatSlice.reducer
type ChatMessageType = ChatMessageAPIType & { id: string }
