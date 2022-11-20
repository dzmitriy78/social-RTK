import React, {useEffect, useState} from "react";
import {ChatMessage, ChatMessageType} from "./ChatMessage";
import {ws} from "./ChatPage";

export const ChatMessages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.addEventListener("message", (e)=>{
            const newMessage = JSON.parse(e.data)
            setMessages((prevState)=>[...prevState, ...newMessage])
        })
    }, [])

    return (
        <div style={{height: 400, overflowY: "auto"}}>
            {messages.map((m, i) => {
                return <ChatMessage key={i} message = {m}/>
            })}

        </div>
    )
}