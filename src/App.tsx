import * as React from 'react';
import {Suspense, useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import {Navbar} from './components/Navbar/Navbar';
import {useDispatch} from "react-redux";
import {initial} from "./redux/initial-reducer";
import MyErrorBoundary from './components/common/MyErrorBoundary';
import {DispatchType, useAppSelector} from "./redux/store";
import {ProgressSpinner} from "primereact/progressspinner";
import 'primereact/resources/primereact.css';

const Header = React.lazy(()=> import("./components/Header/Header"))
const Dialogs = React.lazy(() => import("./components/Dialogs/Dialogs"))
const News = React.lazy(() => import( "./components/News/News"))
const Music = React.lazy(() => import("./components/Music/Music"))
const Settings = React.lazy(() => import( "./components/Settings/Settings"))
const Profile = React.lazy(() => import( "./components/Profile/Profile"))
const Users = React.lazy(() => import("./components/Users/Users"))
const Login = React.lazy(() => import("./components/Login/Login"))
const ChatPage = React.lazy(() => import("./components/Chat/ChatPage"))


const App: React.FC = () => {

    const dispatch = useDispatch<DispatchType>()
    const initialize = useAppSelector(state => state.initial.initialize)

    useEffect(() => {
        dispatch(initial())
    }, [])
    if (!initialize) {
        return (
            <div style={{display:"flex"}}>
                <ProgressSpinner/>
            </div>)
    }
    return (
        <div className='app-wrapper'>
            <MyErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                    <Header/>
                    <Navbar/>
                    <div className={"app-wrapper-content"}>
                        <Routes>
                            <Route path="/" element={<Navigate to={'/profile'}/>}/>
                            <Route path="/dialogs/*" element={<Dialogs/>}/>
                            <Route path="/profile/*" element={<Profile/>}/>
                            <Route path="/users/*" element={<Users/>}/>
                            <Route path="/news/*" element={<News/>}/>
                            <Route path='/music/*' element={<Music/>}/>
                            <Route path="/settings/*" element={<Settings/>}/>
                            <Route path="/login/*" element={<Login/>}/>
                            <Route path="/chatPage/*" element={<ChatPage/>}/>
                            <Route path="*" element={
                                <div style={{fontSize: 60}}>
                                    Page not found!
                                </div>
                            }/>
                        </Routes>
                    </div>
                </Suspense>
            </MyErrorBoundary>
        </div>
    )
}

export default App