import React from "react";
import styles from "./users.module.css"
import userPhoto from "./../../assets/images/user.png"
import {NavLink} from "react-router-dom";
import {following, unfollowing} from "../../redux/usersSlice";
import {Button} from "primereact/button";
import {useAppDispatch} from "../hooks/hooks";

export const User: React.FC<UserPropsType> = ({user, isAuth, followingInProgress}) => {

    const dispatch = useAppDispatch()

    const unfollowHandler = () => dispatch(unfollowing({userId: user.id}))
    const followHandler = () => dispatch(following({userId: user.id}))

    return <div>
               <span>
                   <div>
                       <NavLink to={"/profile/" + user.id}>
                       <img src={user.photos.small != null ? user.photos.small : userPhoto}
                            className={styles.userAvatar}
                            alt={"ava"}/>
                       </NavLink>
                   </div>
                   <div className="card">
                       {user.followed
                           ? <Button label="Unfollow" color={"white"} icon="pi pi-times"
                                     className="p-button-text p-button-raised p-button-rounded p-button-plain p-button-sm"
                                     disabled={!isAuth || followingInProgress.some((id: number) => id === user.id)}
                                     onClick={unfollowHandler}/>
                           : <Button label="Follow" icon="pi pi-check"
                                     className="p-button-text p-button-rounded p-button-raised p-button-plain p-button-sm"
                                     disabled={!isAuth || followingInProgress.some((id: number) => id === user.id)}
                                     onClick={followHandler}/>}
                   </div>
               </span>
        <span>
            <div className={styles.usersName}>{user.name}</div>
            <div className={styles.usersDescr}>{user.status}</div>
        </span>
        <span>
            <div className={styles.usersDescr}>{"user"}</div>
        </span>
    </div>
}

export type UserType = {
    id: number
    photos: { small: string; large: string }
    followed: boolean
    name: string
    status: string
}
type UserPropsType = {
    user: UserType
    isAuth: boolean
    followingInProgress: Array<number>
}