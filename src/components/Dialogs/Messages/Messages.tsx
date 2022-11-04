import React from "react";
import classes from "./../Dialogs.module.css"

export const Message: React.FC<MessageDataType> = ({message}) => {
    return (
        <div className={classes.message}>{message}</div>
    )
}

type MessageDataType = {
    id: number
    message: string
}