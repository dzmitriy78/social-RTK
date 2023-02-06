import React from "react";
import cl from "./Header.module.css";
import {useNavigate} from "react-router-dom";
import {logout} from "../../redux/authSlice";
import {Button} from "primereact/button";
import 'primeicons/primeicons.css';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";


const Header: React.FC = () => {

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const login = useAppSelector(state => state.auth.login)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const logoutHandler = async () => {
        await dispatch(logout())
        navigate("/login")
    }
    const loginHandler = async () => {
        navigate("/login")
    }

    return (
        <header className={cl.header}>
            <img src="https://previews.123rf.com/images/wavy28/wavy281605/wavy28160500900/59350543-hf-logo.jpg"
                 alt={""}/>
            <div className={cl.loginBlock}>
                {
                    isAuth
                        ? <div className={cl.login}>
                            <i className="pi pi-user"></i>
                            <span style={{padding: "0px 5px"}}>&nbsp;</span>
                            {login}
                            <span style={{padding: "0px 5px"}}>&nbsp;</span>
                            <Button label="Exit" icon="pi pi-sign-out" iconPos="right" className="p-button-sm"
                                    onClick={logoutHandler}/>
                        </div>
                        : <div className={cl.login}>
                            <Button label="Log in" icon="pi pi-sign-in" iconPos="right" className="p-button-sm"
                                    onClick={loginHandler}/>
                        </div>
                }
            </div>
        </header>
    )
}
export default Header