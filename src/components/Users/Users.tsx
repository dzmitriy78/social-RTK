import React, {useEffect, useState} from "react";
import styles from "./users.module.css"
import usePagination from "../hooks/usePagination";
import {User} from "./User";
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../../redux/store";
import {getUsers, setCurrentPage} from "../../redux/users-reducer";
import ProgressBarDemo from "../common/ProgressBar/ProgressBar";
import SearchUsers from "../form/SearchUsers";
import {useSearchParams} from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import {InputNumber} from "primereact/inputnumber";


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
    const blockPage = 10

    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage: blockPage,
        count: totalUsersCount,
    })

    const dispatch = useDispatch<DispatchType>()

    const [, setSearchParams] = useSearchParams()
    const [toPage, setToPage] = useState<number | null>(null)
    const debouncedValue = useDebounce(toPage, 1000)

    useEffect(() => {
        const urlQuery =
            (term === '' ? '' : `&term=${term}`)
            + (friend === null ? '' : `&friend=${friend}`)
            + (currentPage === 1 ? '' : `&page=${currentPage}`)
        setSearchParams(urlQuery)
    }, [term, friend])

    useEffect(() => {
        if (toPage && toPage > 0 && toPage <= pagesCount) {
            setPage(Math.ceil(toPage / 10))
            onPageChanged(toPage, friend)
        }
        setToPage(null)
    }, [debouncedValue])

    const onPageChanged = (currentPage: number, friend: null | boolean) => {
        dispatch(getUsers({currentPage, pageSize, term, friend}))
        dispatch(setCurrentPage({currentPage}))
    }

    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
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
            {users.map((u, i) =>
                <User key={i}
                      user={u}
                      isAuth={isAuth}
                      followingInProgress={followingInProgress}
                />)
            }
            {pages.length
                ? <>
                    {<div className={styles.pagination}>
                        {pages.length > blockPage &&
                            <button
                                onClick={prevPage}
                                className={page === 1 ? styles.disabled : styles.page}
                            >
                                &larr;
                            </button>}
                        {pages
                            .slice(firstContentIndex, lastContentIndex)
                            .map((p, i) => {
                                return <span key={i} onClick={() => {
                                    onPageChanged(p, friend)
                                }} className={currentPage === p ? styles.selectedPage : styles.page}>{p}</span>
                            })}
                        {pages.length > blockPage &&
                            <button onClick={nextPage}
                                    className={page === totalPages ? styles.page && styles.disabled : styles.page}
                            >
                                &rarr;
                            </button>}
                        {pages.length > blockPage &&
                            <div className="grid">
                                <div className="field col-12 md:col-3">
                                    <InputNumber buttonLayout={"horizontal"}
                                                 size={4} inputId="horizontal"
                                                 value={toPage} placeholder={"to page..."}
                                                 max={pagesCount}
                                                 onChange={(e) => setToPage(e.value)}
                                                 mode="decimal" showButtons style={{width: '1rem'}}
                                                 decrementButtonClassName="p-button-primary"
                                                 incrementButtonClassName="p-button-primary"
                                                 incrementButtonIcon="pi pi-plus"
                                                 decrementButtonIcon="pi pi-minus"/>
                                </div>
                            </div>
                        }
                    </div>}
                </>
                : <div className={styles.descr}>
                    Sorry, nothing found :(
                </div>
            }
        </div>
    )
}

export default Users

