import {useEffect, useState} from 'react'
import './App.scss'
import routes from "./app/routes";
import { RouterProvider } from "react-router-dom";
import {getUserData} from "./app/func";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {loginSucceed} from "./features/auth/auth-slice";

function App() {
    const localToken = localStorage.getItem('token') ?? sessionStorage.getItem('token')
    const dispatch = useAppDispatch();
    const loggedIn = useAppSelector(state => state.auth.loggedIn)

    if (localToken) {
        dispatch(loginSucceed({token: localToken}))
    }

    if (loggedIn && localToken) {
        getUserData(localToken, dispatch)
    }

    return (
        <RouterProvider router={routes} />
    )
}

export default App
