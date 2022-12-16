import React, {useRef} from "react";
import classes from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "./../../../assets/images/user.png"
import ProfileDataEditingForm from "../../form/ProfileDataEditingForm";
import {useDispatch} from "react-redux";
import {savePhoto, setEditMode, setError} from "../../../redux/profile-reducer";
import {ProfileData} from "./ProfileData";
import {DispatchType} from "../../../redux/store";
import {ProfileType} from "../Profile";
import { Button } from "primereact/button";


export const ProfileInfo: React.FC<ProfileInfoType> = ({
                                                           profile,
                                                           status,
                                                           isOwner,
                                                           error,
                                                           editMode,
                                                           isAuth
                                                       }) => {
    const dispatch = useDispatch<DispatchType>()
    const filePicker = useRef<HTMLInputElement>(null)

    if (!profile) {
        return (
            <Preloader/>
        )
    }

    const onPhotoSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files?.length) {
            dispatch(savePhoto({file: e.target.files[0]}))
        }
    }

    const enableEditMode = () => {
        dispatch(setEditMode({editMode: true}))
    }
    const disableEditMode = () => {
        dispatch(setEditMode({editMode: false}))
        dispatch(setError({error: ""}))
    }

    const handlePick = () => {
        filePicker.current?.click()
    }

    return (
        <div className={classes.profileInfo}>
            <div className={classes.description}>
                <img className={classes.userPhoto}
                     src={profile.photos.large || userPhoto} alt={"photos"}/>
                {isAuth && isOwner && <div>
                    <Button label="Change avatar" onClick={handlePick}/>
                    <input className={classes.hidden} type={"file"}
                           onChange={onPhotoSelect}
                           ref={filePicker}
                           accept={"image/*,.png, .jpg, .gif, .web"}/></div>}
                <ProfileStatus status={status}
                               isOwner={isOwner}
                               isAuth={isAuth}
                />
                {isAuth && isOwner && editMode &&
                    <Button label="Cancel editing" onClick={disableEditMode}/>}
                {isAuth && isOwner && editMode
                    ? <ProfileDataEditingForm profile={profile}
                                              error={error}/>
                    : <ProfileData profile={profile}
                                   goToEditMode={enableEditMode}
                                   isOwner={isOwner}
                                   isAuth={isAuth}/>}
            </div>
        </div>
    )
}

type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean
    isAuth: boolean
    error: string
    editMode: boolean
}
