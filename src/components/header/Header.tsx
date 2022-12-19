import React, {useEffect} from 'react';
import logo from '../../assets/img/argentBankLogo.png';
import {Link} from "react-router-dom";
import './header.scss'
import {useAppSelector, useAppDispatch} from "../../app/hooks";
import {logUserOut} from "../../app/func";

const Header = () => {

    const loggedIn = useAppSelector(state => state.auth.loggedIn)
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
                    {!loggedIn && <Link className="main-nav-item" to={'/login'}>
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>}
                    {
                        loggedIn &&
                        <Link className="main-nav-item" to={'/profile'}>
                            <i className="fa fa-user-circle"></i>
                            Profile
                        </Link>
                    }
                </div>
            </nav>
        </header>
    );
};

export default Header;
