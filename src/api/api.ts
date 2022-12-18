import axios from "axios";
import {ProfileType} from "../components/Profile/Profile";
import {UserType} from "../components/Users/User";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': process.env.REACT_APP_API_KEY as string
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string, friend: null | boolean) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? "" : `&friend=${friend}`))
            .then(response => response.data)
    },
    unfollowUser(id: number) {
        return instance.delete<ResponseType<{}>>(`follow/${id}`)
            .then(response => response.data)
    },
    followUser(id: number) {
        return instance.post<ResponseType<{}>>(`follow/${id}`, {},)
            .then(response => response.data)
    }
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
            .then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType<{}>>(`profile/status/`, {status})
            .then(res => res.data)
    },
    updatePhoto(photo: File) {
        const formData = new FormData()
        formData.append("image", photo)
        return instance.put<ResponseType<{ photos: { large: string, small: string } }>>(`profile/photo/`, formData,
            {headers: {'Content-Type': 'multipart/form-data'}})
            .then(res => res.data)
    },
    updateProfile(profile: ProfileType) {
        return instance.put<ResponseType<{}>>('profile/', profile)
            .then(res => res.data)
    }
}

export const myAPI = {
    authMe() {
        return instance.get<ResponseType<MeResponseType>>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<ResponseType<{ userId: number }>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete<ResponseType<{}>>(`auth/login`)
            .then(res => res.data)
    }
}
export const securityAPI = {
    captcha() {
        return instance.get<{ url: string }>('security/get-captcha-url')
            .then(res => res.data)
    }
}


type GetUsersType = {
    items: UserType[]
    totalCount: number
    error: string
}
type ResponseType<T> = {
    resultCode: number
    messages: string[]
    data: T
}
type MeResponseType = {
    id: number
    email: string
    login: string
}
