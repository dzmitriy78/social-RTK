import React from "react";
import cl from "./Header.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {DispatchType, useAppSelector} from "../../redux/store";
import {logout} from "../../redux/auth-reducer";


const Header: React.FC = () => {

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const login = useAppSelector(state => state.auth.login)
    const navigate = useNavigate()
    const dispatch = useDispatch<DispatchType>()

    const logoutHandler = async () => {
        await dispatch(logout())
        navigate ("/login")
    }

    return (
        <header className={cl.header}>
            <img src="https://previews.123rf.com/images/wavy28/wavy281605/wavy28160500900/59350543-hf-logo.jpg"
                 alt={""}/>
            <div className={cl.loginBlock}>
                {
                    isAuth
                        ? <div>{login}
                            <button className={cl.button} onClick={logoutHandler}>Exit</button>
                        </div>
                        : <NavLink className={cl.button} to={"/login"}>Log in</NavLink>
                }
            </div>
        </header>
    )
}
export default Header