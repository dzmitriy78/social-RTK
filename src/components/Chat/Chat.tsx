import React, {useEffect} from "react";
import {ChatMessages} from "./ChatMessages";
import {ChatForm} from "./ChatForm";
import {Link} from "react-router-dom";
import classes from "./Chat.module.css";
import {startMessagesListening, stopMessagesListening} from "../../redux/chatSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";

export const Chat: React.FC = () => {

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const status = useAppSelector(state => state.chat.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <>
            {status === "error" && <div>Some error occurred. Please refresh the page</div>}

            {isAuth
                ? <div>
                    <ChatMessages/>
                    <ChatForm/>
                </div>
                : <div className={classes.descr}>
                    Please <Link to={"/login"}>sign in</Link> to see the chat.
                </div>
            }
        </>
    )
}