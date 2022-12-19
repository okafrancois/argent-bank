import {createBrowserRouter} from "react-router-dom";
import React from "react";
import Home from "../views/home/Home";
import Login from "../views/login/Login";
import Profile from "../views/profile/Profile";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/profile',
        element: <Profile />,
    }
])

export default routes;
