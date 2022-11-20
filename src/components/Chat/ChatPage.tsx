import React from 'react';
import {Chat} from "./Chat";

export const ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")

const ChatPage: React.FC = () => {

    return (
        <div>
            <Chat/>
        </div>
    )
}

export default ChatPage