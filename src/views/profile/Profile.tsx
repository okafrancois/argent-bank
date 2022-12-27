import React, {FormEvent, useEffect} from 'react';
import Layout from "../../components/layout/Layout";
import './profile.scss'
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {editUserData, getUserTransactions} from "../../app/func";
import AccountItem from "../../components/account-item/Account-item";
const Profile = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const loggedIn = useAppSelector(state => state.auth.loggedIn)
    const token = useAppSelector(state => state.auth.token)
    const user = useAppSelector(state => state.user.data)
    const loading = useAppSelector(state => state.user.loading)
    const userTransactions = useAppSelector(state => state.transactions.userTransaction)

    const [editMode, setEditMode] = React.useState(false)
    const firstNameRef = React.useRef<HTMLInputElement>(null)
    const lastNameRef = React.useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login')
        }

        if (user && token) {
            getUserTransactions(token, dispatch)
        }
    }, [loggedIn, navigate])

    const toggleEditMode = () => {
        setEditMode(!editMode)
    }

    const handleEditModeToggle = (e: FormEvent) => {
        e.preventDefault()
        toggleEditMode()
    }

    const handleEditSubmit = (e: FormEvent) => {
        e.preventDefault()

        const firstName = firstNameRef.current?.value ? firstNameRef.current.value : user.firstName
        const lastName = lastNameRef.current?.value ? lastNameRef.current.value : user.lastName

        if (firstName && lastName) {
            editUserData(
                {firstName, lastName},
                dispatch,
                toggleEditMode
            )
        }
    }

    return (
        <Layout containerClass={"profile-view bg-dark"}>
            {
                loading && <div>Loading...</div>
            }

            {
                !loading && user && <>
                    <div className="header">
                        <h1>Welcome back<br/> {user.firstName} </h1>
                        {
                            editMode &&
                            <form className={"edit-form"} onSubmit={handleEditSubmit}>
                                <div className="input-wrapper">
                                    <input type="text" ref={firstNameRef} name="firstname" placeholder={user.firstName ?? ''}/>
                                </div>
                                <div className="input-wrapper">
                                    <input type="text" ref={lastNameRef} name="lastname" placeholder={user.lastName ?? ''}/>
                                </div>
                                <button className="edit-button" type={"submit"}>Save</button>
                                <button className="edit-button" onClick={handleEditModeToggle}>Cancel</button>
                            </form>
                        }
                        { !editMode && <button className="edit-button" onClick={handleEditModeToggle}>Edit Name</button> }
                    </div>
                    <div className="accounts-listing">
                        <h2 className="sr-only">Accounts</h2>
                        {
                            userTransactions && userTransactions.map((transaction, index) => {
                              return <AccountItem key={index} transaction={transaction}/>
                            })
                        }
                    </div>
                </>
            }
        </Layout>
    );
};

export default Profile;
