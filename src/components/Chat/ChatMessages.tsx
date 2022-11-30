import React, {useEffect, useState} from "react";
import {ChatMessage, ChatMessageType} from "./ChatMessage";
import {ws} from "./ChatPage";
import classes from "./Chat.module.css"

export const ChatMessages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener("message", (e) => {
            const newMessage = JSON.parse(e.data)
            setMessages((prev) => [...prev, ...newMessage])
        })
    }, [])

    return (
        <div className={classes.chatMessages}>
            {messages.map((m, i) => {
                return <ChatMessage key={i} message={m}/>
            })}

        </div>
    )
}