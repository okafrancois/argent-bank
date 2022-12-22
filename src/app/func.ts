import {loginSucceed, loginFailed, loginRequest, logout} from "../features/auth/auth-slice";
import {getUserDataFailed, getUserDataSucceed} from "../features/user/user-slice";
import {EditUserFunc, GetUserDataFunc, LogUserInFunc, LogUserOutFunc} from "./func-types";

export const logUserIn: LogUserInFunc = ({ email, password }, dispatch, keepLoggedIn) => {
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
                if (keepLoggedIn) {
                    localStorage.setItem('token', token);
                } else {
                    sessionStorage.setItem('token', token);
                }

                dispatch(loginSucceed({token}));
            } else {
                dispatch(loginFailed(result.message));
            }
        })
        .catch(error => {
            dispatch(loginFailed(error));
        })
}
export const logUserOut: LogUserOutFunc = (dispatch) => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    dispatch(logout());
}
export const getUserData: GetUserDataFunc = (token, dispatch) => {
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
            if (result.body) {
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
export const editUserData: EditUserFunc = (data, dispatch, resolveCallback) => {
    const uri = `${import.meta.env.VITE_API_URL}/user/profile`;
    const token = localStorage.getItem("token") ?? sessionStorage.getItem("token") ?? null;

    const myHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    });

    const raw = JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName
    });

    const requestOptions: RequestInit = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    }

    fetch(uri, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.body) {
                const { id, email, firstName, lastName } = result.body;

                dispatch(getUserDataSucceed({
                    id,
                    email,
                    firstName,
                    lastName
                }));

                resolveCallback();
            } else {
                dispatch(getUserDataFailed(result.message));
            }
        })
        .catch(error => {
            dispatch(getUserDataFailed(error));
        })
}
