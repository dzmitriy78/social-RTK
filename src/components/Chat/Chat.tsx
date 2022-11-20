import React from "react";
import {ChatMessages} from "./ChatMessages";
import {ChatForm} from "./ChatForm";

export const Chat: React.FC = () => {

    return (
        <div>
            <ChatMessages/>
            <ChatForm/>
        </div>
    )
}