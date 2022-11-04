import {connect, useDispatch} from "react-redux";
import {getUsers, setCurrentPage} from "../../redux/users-reducer";
import {Users, UsersType} from "./Users";
import React, {useEffect} from "react";
import {compose} from "redux";
import {AppStateType, DispatchType} from "../../redux/store";
import ProgressBarDemo from "../common/ProgressBar/ProgressBar";


const UsersContainer: React.FC<UsersContainerPropsType> = (props) => {

    const dispatch = useDispatch<DispatchType>()
    useEffect(() => {
            dispatch(getUsers({currentPage: props.currentPage, pageSize: props.pageSize}))
        }, []
    )

    const onPageChanged = (numberPage: number) => {
        dispatch(getUsers({currentPage: numberPage, pageSize: props.pageSize}))
        dispatch(setCurrentPage({currentPage: numberPage}))
    }

    return <>
        {props.isFetching ? <ProgressBarDemo /> : null}
        <Users
            totalUsersCount={props.totalUsersCount}
            users={props.users}
            currentPage={props.currentPage}
            onPageChanged={onPageChanged}
            pageSize={props.pageSize}
            followingInProgress={props.followingInProgress}
            isAuth={props.isAuth}
        />
    </>
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    /* withAuthRedirect,*/
    connect(mapStateToProps, {
        setCurrentPage, getUsers
    }))
(UsersContainer)

export type UsersContainerPropsType = {
    currentPage: number
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    isFetching: boolean
    followingInProgress: Array<number>
    isAuth: boolean
}
