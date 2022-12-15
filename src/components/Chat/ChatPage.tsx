import React from 'react';
import {Chat} from "./Chat";
import classes from "./Chat.module.css";


const ChatPage: React.FC = () => {

    return (
        <div className={classes.chat}>
            <Chat/>
        </div>
    )
}

export default ChatPage