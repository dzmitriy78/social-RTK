import React from "react";

export const ChatMessage: React.FC<{message:ChatMessageType}> = ({message}) => {

    return (
        <div>
            <img src={message.photo} style={{width:40}} alt={"chatAvatar"}/> <b>{message.userName}</b>
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