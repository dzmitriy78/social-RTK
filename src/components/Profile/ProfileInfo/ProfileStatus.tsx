import React, {useEffect, useState} from 'react';
import classes from "./ProfileInfo.module.css"
import {useDispatch} from "react-redux";
import {DispatchType} from "../../../redux/store";
import {updateStatus} from "../../../redux/profile-reducer";

interface ProfileStatusPropsType {
    status: string
    isOwner: boolean
    isAuth: boolean
}

const ProfileStatus: React.FC<ProfileStatusPropsType> = ({
                                                             status,
                                                             isOwner,
                                                             isAuth
                                                         }) => {
    const dispatch = useDispatch<DispatchType>()

    const [editMode, setEditMode] = useState<boolean>(false)
    const [newStatus, setNewStatus] = useState<string>(status)

    useEffect(() => {
        if (status) {
            setNewStatus(status)
        } else {
            setNewStatus("")
        }
    }, [status])

    const activateEditMode = () => {
        if (isAuth && isOwner)
            setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatus({status: newStatus}))
    }

    const onStatusChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewStatus(e.currentTarget.value)
    }

    return (
        <div className={classes.status}>
            {!editMode
                ? <div>
                    <span className={classes.statusTitle} title={"double click to change"}
                          onDoubleClick={activateEditMode}>
                        {status || "no Status"}
                    </span>
                </div>
                : <div>
                    <input
                        onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={newStatus}/>
                </div>
            }
        </div>
    );
};

export default ProfileStatus;