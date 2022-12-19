import {loginSucceed, loginFailed, loginRequest, logout} from "../features/auth/auth-slice";
import {Dispatch} from "@reduxjs/toolkit";
import {getUserDataFailed, getUserDataSucceed} from "../features/user/user-slice";
export const logUserIn = ({ email, password }: {email: string, password: string}, dispatch: Dispatch) => {
    dispatch(loginRequest());

    const uri = `${import.meta.env.VITE_API_URL}/user/login`;

    const myHeaders = new Headers({
        "Content-Type": "application/json"
    });

    const raw = JSON.stringify({
        email: email,
        password: password
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch(uri, requestOptions)
        .then(response => response.json())
        .then(result => {
            const { token } = result.body;
            if (token) {
                // set token in local storage
                localStorage.setItem("token", token);
                dispatch(loginSucceed({token}));
            } else {
                dispatch(loginFailed(result.message));
            }
        })
        .catch(error => {
            dispatch(loginFailed(error));
        })
}

export const logUserOut = (dispatch: Dispatch) => {
    localStorage.removeItem("token");
    dispatch(logout());
}
export const getUserData = (token: string, dispatch: Dispatch) => {
    const uri = `${import.meta.env.VITE_API_URL}/user/profile`;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(uri, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if (result.body) {
                console.log(result.body);
                const { id, email, firstName, lastName } = result.body;

                dispatch(getUserDataSucceed({
                    id,
                    email,
                    firstName,
                    lastName
                }));
            } else {
                dispatch(getUserDataFailed(result.message));
            }
        })
        .catch(error => {
            dispatch(getUserDataFailed(error));
        })
}
