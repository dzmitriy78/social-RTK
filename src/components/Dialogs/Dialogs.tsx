import React from "react";
import classes from "./Dialogs.module.css"
import {Dialog} from "./Dialog/Dialog";
import PostForm, {FormikValues} from "../form/PostForm";
import {Message} from "./Messages/Messages";
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../../redux/store";
import {addDialog} from "../../redux/message-reducer";

export const Dialogs: React.FC = () => {

    const dispatch = useDispatch<DispatchType>()
    const messageData = useAppSelector(state => state.messagePage.messageData)
    const dialogsData = useAppSelector(state => state.messagePage.dialogsData)

    const dialogsElement = dialogsData
        .map((d, i) => <Dialog key={i} avatar={d.avatar} name={d.name} id={d.id}/>);

    const messageElement = messageData
        .map((m, i) => <Message key={i} id={m.id} message={m.message}/>);


    const addNewDialog = (values: FormikValues) => {
        dispatch(addDialog({dialogText:values.text}))
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                {messageElement}
                <PostForm callback={addNewDialog}/>
            </div>
        </div>
    )
}