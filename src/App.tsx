import './App.scss'
import routes from "./app/routes";
import { RouterProvider } from "react-router-dom";
import {getUserData} from "./app/func";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {loginSucceed} from "./features/auth/auth-slice";
import {useEffect} from "react";

function App() {
    const localToken = localStorage.getItem('token') ?? sessionStorage.getItem('token')
    const loggedIn = useAppSelector(state => state.auth.loggedIn)
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localToken) {
            dispatch(loginSucceed({token: localToken}))
        }

        if (localToken && loggedIn) {
            getUserData(localToken, dispatch)
        }
    }, [localToken, loggedIn, dispatch])

    return (
        <RouterProvider router={routes} />
    )
}

export default App
