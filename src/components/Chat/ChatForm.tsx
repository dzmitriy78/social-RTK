import React, {useState} from "react";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {ws} from "./ChatPage";

export const ChatForm: React.FC = () => {

    const [message, setMessage] = useState<string>("")

    const sendMessage = () => {
        if (message) {
            ws.send(message)
            setMessage("")
        }
    }

    return (
        <div>
            <div>
                <InputTextarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}/>
            </div>
            <div>
                <Button onClick={sendMessage}>Send</Button>
            </div>
        </div>
    )
}