import React, {useEffect, useRef, useState} from "react";
import {ChatMessage} from "./ChatMessage";
import classes from "./Chat.module.css"
import {RootState} from "../../redux/store";
import {useAppSelector} from "../hooks/hooks";

export const ChatMessages: React.FC = () => {

    const messages = useAppSelector((state: RootState) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll)
            messagesAnchorRef.current?.scrollIntoView(true)
    }, [messages])

    return (
        <div className={classes.chatMessages} onScroll={scrollHandler}>
            {messages.map((m) => {
                return <ChatMessage key={m.id} message={m}/>
            })}
            <div ref={messagesAnchorRef}></div>

        </div>
    )
}