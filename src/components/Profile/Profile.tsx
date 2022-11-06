import React, {useEffect} from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import no_profile_img from "./../../assets/images/noPofile.jpg"
import {MyPosts} from "./MyPosts/MyPosts";
import {DispatchType, useAppSelector} from "../../redux/store";
import {PathMatch, useMatch} from "react-router-dom";
import {compose} from "redux";
import {useDispatch} from "react-redux";
import {getProfile, getStatus} from "../../redux/profile-reducer";


const ProfileURLMatch = (Component: React.FC<ProfilePropsType>) => {
    let RouterComponent: (props: ProfilePropsType) => JSX.Element
    RouterComponent = (props) => {
        const match = useMatch('/profile/:userId/')
        return <Component {...props} match={match}/>
    }
    return RouterComponent
}

const Profile: React.FC<ProfilePropsType> = ({match}) => {

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const profile = useAppSelector(state => state.profilePage.profile)
    const status = useAppSelector(state => state.profilePage.status)
    const meId = useAppSelector(state => state.auth.userId)
    const error = useAppSelector(state => state.profilePage.error)
    const editMode = useAppSelector(state => state.profilePage.editMode)

    const dispatch = useDispatch<DispatchType>()

    useEffect(() => {
        let userId = match
            ? match.params.userId
            : meId
        if (userId) {
            dispatch(getProfile({userId: userId as number}))
            dispatch(getStatus({userId: userId as number}))
        }
    }, [match, meId, dispatch])

    if (!profile) {
        return <div>
            <img src={no_profile_img} alt={"noProfileImg"}/>
        </div>
    }
    return (
        <div>
            <ProfileInfo profile={profile}
                         status={status}
                         isOwner={!match?.params.userId}
                         isAuth={isAuth}
                         editMode={editMode}
                         error={error}/>
            <MyPosts/>
        </div>
    )
}
export default compose<React.ComponentType>(ProfileURLMatch)(Profile)

type ProfilePropsType = {
    match?: PathMatch | null
}
export type ProfileType = {
    aboutMe: string
    contacts: {
        facebook: string
        github: string
        instagram: string
        mainLink: string
        twitter: string
        vk: string
        website: string
        youtube: string
    }
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    photos: { small: string, large: string }
    userId: number
}