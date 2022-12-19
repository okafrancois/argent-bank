import React, {useEffect, useState} from 'react';
import Layout from "../../components/layout/Layout";
import './login.scss'
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {logUserIn} from "../../app/func";

const Login = () => {
    const loggedIn = useAppSelector(state => state.auth.loggedIn)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (email && password) {
            logUserIn({
                email,
                password
            }, dispatch)
        }
    }

    useEffect(() => {
      if (loggedIn) {
        navigate('/profile')
      }
    })

    return (
        <Layout containerClass={"login-view bg-dark"}>
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="user-mail">User Email</label>
                        <input type="email" id="user-mail" ref={emailRef}/>
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" ref={passwordRef}/>
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me"/>
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button" type={"submit"}>Sign In</button>
                </form>
            </section>
        </Layout>
    );
};

export default Login;
