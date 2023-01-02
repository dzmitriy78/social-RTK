import React, {useEffect, useRef, useState} from "react";
import {ChatMessage} from "./ChatMessage";
import classes from "./Chat.module.css"
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";

export const ChatMessages: React.FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)
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
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
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