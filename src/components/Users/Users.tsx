import React, {useEffect} from "react";
import styles from "./users.module.css"
import usePagination from "../hooks/usePagination";
import {User} from "./User";
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../../redux/store";
import {getUsers, setCurrentPage} from "../../redux/users-reducer";
import ProgressBarDemo from "../common/ProgressBar/ProgressBar";


const Users: React.FC = () => {

    const totalUsersCount = useAppSelector(state => state.usersPage.totalUsersCount)
    const pageSize = useAppSelector(state => state.usersPage.pageSize)
    const currentPage = useAppSelector(state => state.usersPage.currentPage)
    const isFetching = useAppSelector(state => state.usersPage.isFetching)
    const followingInProgress = useAppSelector(state => state.usersPage.followingInProgress)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const users = useAppSelector(state => state.usersPage.users)

    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage: 10,
        count: totalUsersCount,
    })

    const dispatch = useDispatch<DispatchType>()

    useEffect(() => {
            dispatch(getUsers({currentPage, pageSize}))
        }, []
    )

    const onPageChanged = (currentPage: number) => {
        dispatch(getUsers({currentPage, pageSize}))
        dispatch(setCurrentPage({currentPage}))
    }

    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const goPage = () => {
        const num = Number(prompt("Jump to page..."))
        if (num > 0) {
            setPage(Math.ceil(num / 10))
            onPageChanged(num)
        } else {
            alert("Invalid page number entered")
        }
    }
    return (
        <div className={styles.users}>
            {isFetching && <ProgressBarDemo/>}
            <div>
                {(
                    <div className={styles.pagination}>
                        <button
                            onClick={prevPage}
                            className={page === 1 ? styles.disabled : styles.page}
                        >
                            &larr;
                        </button>
                        {pages
                            .slice(firstContentIndex, lastContentIndex)
                            .map((p, i) => {
                                return <span key={i} onClick={() => {
                                    onPageChanged(p)
                                }} className={currentPage === p ? styles.selectedPage : styles.page}>{p}</span>
                            })}
                        <button
                            onClick={nextPage}
                            className={page === totalPages ? styles.page && styles.disabled : styles.page}
                        >
                            &rarr;
                        </button>
                        <button className={styles.btn} onClick={goPage}>
                            Go to
                        </button>
                    </div>
                )}
            </div>
            {
                users.map((u, i) =>
                    <User key={i}
                          user={u}
                          isAuth={isAuth}
                          followingInProgress={followingInProgress}
                    />)
            }
        </div>)
}

export default Users

export type UsersType = {
    id: number
    photos: { small: string; large: string }
    followed: boolean
    name: string
    status: string
}

export type UsersPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pages: number) => void
    followingInProgress: Array<number>
    isAuth: boolean
}
