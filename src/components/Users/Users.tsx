import React, {useEffect} from "react";
import styles from "./users.module.css"
import usePagination from "../hooks/usePagination";
import {User} from "./User";
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../../redux/store";
import {getUsers, setCurrentPage} from "../../redux/users-reducer";
import ProgressBarDemo from "../common/ProgressBar/ProgressBar";
import SearchUsers from "../form/SearchUsers";
import {useSearchParams} from "react-router-dom";


const Users: React.FC = () => {

    const totalUsersCount = useAppSelector(state => state.usersPage.totalUsersCount)
    const pageSize = useAppSelector(state => state.usersPage.pageSize)
    const currentPage = useAppSelector(state => state.usersPage.currentPage)
    const isFetching = useAppSelector(state => state.usersPage.isFetching)
    const followingInProgress = useAppSelector(state => state.usersPage.followingInProgress)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const users = useAppSelector(state => state.usersPage.users)
    const term = useAppSelector(state => state.usersPage.filter.term)
    const friend = useAppSelector(state => state.usersPage.filter.friend)


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

    const [, setSearchParams] = useSearchParams()

    useEffect(() => {
        const urlQuery =
            (term === '' ? '' : `&term=${term}`)
            + (friend === null ? '' : `&friend=${friend}`)
            + (currentPage === 1 ? '' : `&page=${currentPage}`)
        setSearchParams(urlQuery)
    }, [term, friend])

    const onPageChanged = (currentPage: number, friend: null | boolean) => {
        dispatch(getUsers({currentPage, pageSize, term, friend}))
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
            onPageChanged(num, friend)
        } else {
            alert("Invalid page number entered")
        }
    }

    const onSearch = (value: string, selectedValue: null | boolean) => {
        dispatch(getUsers({currentPage: 1, pageSize, term: value, friend: selectedValue}))
        dispatch(setCurrentPage({currentPage: 1}))
    }

    return (
        <div className={styles.users}>
            {isFetching && <ProgressBarDemo/>}
            <div className={styles.descr}>
                Search users:
            </div>
            <SearchUsers callback={onSearch}/>
            {
                users.map((u, i) =>
                    <User key={i}
                          user={u}
                          isAuth={isAuth}
                          followingInProgress={followingInProgress}
                    />)
            }
            {pages.length
                ? <div>
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
                                        onPageChanged(p, friend)
                                    }} className={currentPage === p ? styles.selectedPage : styles.page}>{p}</span>
                                })}
                            <button
                                onClick={nextPage}
                                className={page === totalPages ? styles.page && styles.disabled : styles.page}
                            >
                                &rarr;
                            </button>
                            {pages.length > 10
                                ? <button className={styles.btn} onClick={goPage}>
                                    Go to
                                </button>
                                : ""
                            }
                        </div>
                    )}
                </div>
                : <div className={styles.descr}>
                    Sorry, nothing found :(
                </div>
            }
        </div>)
}

export default Users

