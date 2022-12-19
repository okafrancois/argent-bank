import {useEffect, useState} from 'react'
import './App.scss'
import routes from "./app/routes";
import { RouterProvider } from "react-router-dom";

function App() {
    return (
        <RouterProvider router={routes} />
    )
}

export default App
