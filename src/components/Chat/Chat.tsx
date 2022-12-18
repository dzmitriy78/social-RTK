import React, {useEffect} from "react";
import {ChatMessages} from "./ChatMessages";
import {ChatForm} from "./ChatForm";
import {useAppSelector} from "../../redux/store";
import {Link} from "react-router-dom";
import classes from "./Chat.module.css";
import {useDispatch} from "react-redux";
import {startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";

export const Chat: React.FC = () => {

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        console.log("effect")
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <>
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