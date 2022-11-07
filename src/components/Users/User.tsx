import React from "react";
import styles from "./users.module.css"
import userPhoto from "./../../assets/images/user.png"
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {DispatchType} from "../../redux/store";
import {following, unfollowing} from "../../redux/users-reducer";


export const User: React.FC<UserPropsType> = ({user, isAuth, followingInProgress}) => {

    const dispatch = useDispatch<DispatchType>()

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
                   <div className={styles.follow}>
                       {user.followed ?
                           <button className={styles.btn}
                                   disabled={!isAuth || followingInProgress.some((id: number) => id === user.id)}
                                   onClick={unfollowHandler}>Unfollow</button>
                           : <button className={styles.btn}
                                     disabled={!isAuth || followingInProgress.some((id: number) => id === user.id)}
                                     onClick={followHandler}>Follow</button>}
                   </div>
               </span>
        <span>
            <div className={styles.usersName}>{user.name}</div>
            <div className={styles.usersDescr}>{user.status}</div>
        </span>
        <span>
            <div className={styles.usersDescr}>{"user.location.city"}</div>
            <div className={styles.usersDescr}>{"user.location.country"}</div>
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