import React from "react";
import classes from "./Chat.module.css"

export const ChatMessage: React.FC<{message:ChatMessageType}> = ({message}) => {

    return (
        <div>
            <img src={message.photo} className={classes.chatAvatar} alt={"chatAvatar"}/> <b>{message.userName}</b>
            <br/>
            {message.message}
            <br/>
            <hr/>
        </div>
    )
}

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string

}