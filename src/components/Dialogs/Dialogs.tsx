import React from "react";
import classes from "./Dialogs.module.css"
import {Dialog} from "./Dialog/Dialog";
import DataForm, {FormikValues} from "../form/DataForm";
import {Message} from "./Messages/Messages";
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../../redux/store";
import {addDialog} from "../../redux/message-reducer";
import {Navigate} from "react-router-dom";

const Dialogs: React.FC = () => {

    const dispatch = useDispatch<DispatchType>()
    const messageData = useAppSelector(state => state.messagePage.messageData)
    const dialogsData = useAppSelector(state => state.messagePage.dialogsData)
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const dialogsElement = dialogsData
        .map((d, i) => <Dialog key={i} avatar={d.avatar} name={d.name} id={d.id}/>);

    const messageElement = messageData
        .map((m, i) => <Message key={i} id={m.id} message={m.message}/>);

    const addNewDialog = (values: FormikValues) => {
        dispatch(addDialog({dialogText: values.text}))
    }
    if (!isAuth)
        return <Navigate replace to="/login"/>

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                {messageElement}
                <DataForm callback={addNewDialog}
                          fieldType={'textarea'}
                          placeholder={'write a message'}
                          title={"Add message"}/>
            </div>
        </div>
    )
}
export default Dialogs