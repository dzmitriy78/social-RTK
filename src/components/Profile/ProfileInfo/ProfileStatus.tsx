import React, {ChangeEvent, useEffect, useState} from 'react';

interface ProfileStatusPropsType {
    status: string
    updateStatus(status: string): void
}

const ProfileStatus: React.FC<ProfileStatusPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        if (props.status) {
            setStatus(props.status)
        } else {
            setStatus("")
        }
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }


    return (
        <div>
            {!editMode
                ? <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "no status"}</span>
                </div>
                : <div>
                    <input
                        onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}/>
                </div>
            }
        </div>
    );
};

export default ProfileStatus;