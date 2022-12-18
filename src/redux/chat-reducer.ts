import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {chatAPI, ChatMessageType} from "../api/chatAPI";

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: (arg0: { payload: { messages: ChatMessageType[]; }; type: "chat/messagesReceived"; }) => void) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived({messages}))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = createAsyncThunk("chat/startMessageListening", async (arg, thunkAPI) => {
    try {
        chatAPI.start()
        await chatAPI.subscribe(newMessageHandlerCreator(thunkAPI.dispatch))
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})
export const stopMessagesListening = createAsyncThunk("chat/startMessageListening", async (arg, thunkAPI) => {
    try {
        chatAPI.unsubscribe(newMessageHandlerCreator(thunkAPI.dispatch))
        chatAPI.stop()
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})
export const sendMessage = createAsyncThunk("chat/startMessageListening", async (arg: { message: string }, thunkAPI) => {
    try {
        chatAPI.sendMess(arg.message)
    } catch (e) {
        return thunkAPI.rejectWithValue(null)
    }
})


const slice = createSlice({
    name: "chat",
    initialState: {
        messages: [] as ChatMessageType[]
    },
    reducers: {
        messagesReceived: (state, action: PayloadAction<{ messages: ChatMessageType[] }>) => {
            state.messages = [...state.messages, ...action.payload.messages]
        }
    }
})

export const chatReducer = slice.reducer
export const {messagesReceived} = slice.actions