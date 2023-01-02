import React from "react";
import classes from "./Chat.module.css"
import {ChatMessageAPIType} from "../../api/chatAPI";

export const ChatMessage: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {

    return (
        <div>
            <img src={message.photo} className={classes.chatAvatar} alt={"chatAvatar"}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <br/>
            <hr/>
        </div>
    )
})