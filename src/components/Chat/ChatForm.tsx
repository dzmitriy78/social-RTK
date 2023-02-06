import React, {useState} from "react";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import {sendMessage} from "../../redux/chatSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";

export const ChatForm: React.FC = () => {

    const status = useAppSelector(state => state.chat.status)
    const [message, setMessage] = useState<string>("")

    const dispatch = useAppDispatch()
    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage({message}))
        setMessage("")
    }

    return (
        <div>
            <div className="card">
                <InputTextarea rows={3} cols={30} autoResize
                               value={message}
                               onChange={(e) => setMessage(e.currentTarget.value)}/>
            </div>
            <div>
                <Button label={"Send"} icon="pi pi-check" onClick={sendMessageHandler}
                        disabled={status !== "ready"}/>
            </div>
        </div>
    )
}