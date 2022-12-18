import React from "react";
import {ChatMessage} from "./ChatMessage";
import classes from "./Chat.module.css"
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";

export const ChatMessages: React.FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <div className={classes.chatMessages}>
            {messages.map((m, i) => {
                return <ChatMessage key={i} message={m}/>
            })}

        </div>
    )
}