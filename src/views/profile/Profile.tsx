import React, {useEffect} from 'react';
import Layout from "../../components/layout/Layout";
import './profile.scss'
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {getUserData} from "../../app/func";
const Profile = () => {
    const loggedIn = useAppSelector(state => state.auth.loggedIn)
    const token = useAppSelector(state => state.auth.token)
    const user = useAppSelector(state => state.user.data)
    const loading = useAppSelector(state => state.user.loading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login')
        }

        if (token && user.id === null) {
            getUserData(token, dispatch)
        }
    }, [token])

    return (
        <Layout containerClass={"profile-view bg-dark"}>
            {
                loading && <div>Loading...</div>
            }

            {
                !loading && user && <>
                    <div className="header">
                        <h1>Welcome back<br/> {user.firstName} </h1>
                        <button className="edit-button">Edit Name</button>
                    </div>
                    <h2 className="sr-only">Accounts</h2>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                            <p className="account-amount">$2,082.79</p>
                            <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                            <p className="account-amount">$10,928.42</p>
                            <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                            <p className="account-amount">$184.30</p>
                            <p className="account-amount-description">Current Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                </>
            }
        </Layout>
    );
};

export default Profile;
