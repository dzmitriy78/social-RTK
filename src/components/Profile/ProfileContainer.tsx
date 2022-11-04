import React, {useEffect} from "react";
import Profile from "./Profile";
import {connect, useDispatch} from "react-redux";
import {getProfile, getStatus} from "../../redux/profile-reducer";
import {Params, PathMatch, useMatch} from "react-router-dom";
import {compose} from "redux";
import {AppStateType, DispatchType} from "../../redux/store";

export const ProfileURLMatch = (Component: React.FC<ProfileContainerPropsType>) => {
    let RouterComponent: (props: ProfileContainerPropsType) => JSX.Element;
    RouterComponent = (props: ProfileContainerPropsType) => {
        const match = useMatch('/profile/:userId/');
        return <Component {...props} match={match}/>;
    };
    return RouterComponent
}

const ProfileContainer: React.FC<ProfileContainerPropsType> = ({
                                                                   profile,
                                                                   status,
                                                                   meId,
                                                                   match,
                                                                   editMode,
                                                                   error
                                                               }) => {
    const dispatch = useDispatch<DispatchType>()

    useEffect(() => {
        let userId = match
            ? match.params.userId
            : meId
        if (userId) {
            dispatch(getProfile({userId: userId as number}))
            dispatch(getStatus({userId: userId as number}))
        }
    }, [match?.params.userId])

    return (
        <Profile profile={profile}
                 status={status}
                 isOwner={!match?.params.userId}
                 editMode={editMode}
                 error={error}/>
    )
}

function mapStateToProps(state: AppStateType) {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        meId: state.auth.userId,
        error: state.profilePage.error,
        editMode: state.profilePage.editMode,
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, getStatus}),
    ProfileURLMatch,
    /* withAuthRedirect*/)
(ProfileContainer)

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
export type ProfileContainerPropsType = {
    profile: ProfileType
    match?: PathMatch | null
    params?: Params
    getProfile(userId: number): void
    getStatus(userId: number): void
    status: string
    meId: number
    userId: number
    error: string
    editMode: boolean
}