import React, {useEffect, useState} from "react";
import {ChatMessage, ChatMessageType} from "./ChatMessage";
import classes from "./Chat.module.css"

export const ChatMessages: React.FC<{ ws: WebSocket | null }> = ({ws}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessage = JSON.parse(e.data)
            setMessages((prev) => [...prev, ...newMessage])
        }
        ws?.addEventListener("message", messageHandler)
        return () => {
            ws?.removeEventListener("message", messageHandler)
        }
    }, [ws])

    return (
        <div className={classes.chatMessages}>
            {messages.map((m, i) => {
                return <ChatMessage key={i} message={m}/>
            })}

        </div>
    )
}