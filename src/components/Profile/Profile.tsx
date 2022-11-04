import React from "react";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ProfileType} from "./ProfileContainer";
import no_profile_img from "./../../assets/images/noPofile.jpg"
import {MyPosts} from "./MyPosts/MyPosts";
import {useAppSelector} from "../../redux/store";


const Profile: React.FC<ProfileProps> = ({
                                                    profile,
                                                    status,
                                                    isOwner,
                                                    error,
                                                    editMode,
                                                }) => {

    const isAuth = useAppSelector(state => state.auth.isAuth)

    if (!profile) {
        return <div>
            <img src={no_profile_img} alt={"noProfileImg"}/>
        </div>
    }
    return (
        <div>
            <ProfileInfo profile={profile}
                         status={status}
                         isOwner={isOwner}
                         isAuth={isAuth}
                         editMode={editMode}
                         error={error}/>
            <MyPosts/>
        </div>
    )
}

export default Profile

interface ProfileProps {
    profile: ProfileType
    status: string
    isOwner: boolean
    error: string
    editMode: boolean
}