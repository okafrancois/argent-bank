import React, {useEffect} from 'react';
import logo from '../../assets/img/argentBankLogo.png';
import {Link} from "react-router-dom";
import './header.scss'
import {useAppSelector, useAppDispatch} from "../../app/hooks";
import {logUserOut} from "../../app/func";

const Header = () => {

    const loggedIn = useAppSelector(state => state.auth.loggedIn)
    const userName = useAppSelector(state => state.user.data.firstName)
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        logUserOut(dispatch)
    }

    return (
        <header>
            <nav className="main-nav">
                <Link className="main-nav-logo" to={'/'}>
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {
                        !loggedIn &&
                        <Link className="main-nav-item" to={'/login'}>
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </Link>
                    }
                    {
                        loggedIn &&
                        <Link className="main-nav-item" to={'/profile'}>
                            <i className="fa fa-user-circle"></i>
                            {userName}
                        </Link>
                    }
                    {
                        loggedIn &&
                        <button className="main-nav-item" onClick={handleLogout}>
                            <i className="fa-sharp fa-solid fa-right-from-bracket"></i>
                            Sign Out
                        </button>
                    }
                </div>
            </nav>
        </header>
    );
};

export default Header;
