import React, {useEffect, useState} from "react";
import {ChatMessages} from "./ChatMessages";
import {ChatForm} from "./ChatForm";
import {useAppSelector} from "../../redux/store";
import {Link} from "react-router-dom";
import classes from "./Chat.module.css";

export const Chat: React.FC = () => {

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const [ws, setWs] = useState<WebSocket | null>(null)

    useEffect(() => {
        let wsChannel: WebSocket
        const closeHandler = () => {
            console.log("close")
            setTimeout(createChannel, 1000)
        }

        function createChannel() {
                wsChannel?.removeEventListener("close", closeHandler)
                wsChannel?.close()

            wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            wsChannel.addEventListener("close", closeHandler)
            setWs(wsChannel)
        }

        createChannel()
        return () => {
            wsChannel.removeEventListener("close", closeHandler)
            wsChannel.close()
        }
    }, [])

    return (
        <>
            {isAuth
                ? <div>
                    <ChatMessages ws={ws}/>
                    <ChatForm ws={ws}/>
                </div>
                : <div className={classes.descr}>
                    Please <Link to={"/login"}>sign in</Link> to see the chat.
                </div>
            }
        </>
    )
}