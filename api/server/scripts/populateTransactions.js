const axios = require('axios')
const jwt = require("jsonwebtoken");
const signupApi = 'http://localhost:3001/api/v1/user/signup'
const loginApi = 'http://localhost:3001/api/v1/user/login'
const transactionsApi = 'http://localhost:3001/api/v1/user/transactions/new'

const defaultUsers = [
    {
        firstName: 'Tony',
        lastName: 'Stark',
        email: 'tony@stark.com',
        password: 'password123',
        balance: 1800,
        transactions: []
    },
    {
        firstName: 'Steve',
        lastName: 'Rogers',
        email: 'steve@rogers.com',
        password: 'password456',
        balance: 2000,
        transactions: []
    }
]

const defaultTransactions = [
    {
        userId: null,
        title: 'Paycheck',
        description: 'Golden Sun Bakery',
        amount: -10.55,
        type: 'expense',
        category: 'Entertainment',
        notes: '',
    },
    {
        userId: null,
        title: 'Golden Sun Bakery',
        description: 'Golden Sun Bakery',
        amount: -39.55,
        type: 'expense',
        category: 'Food',
        notes: '',
    },
    {
        userId: null,
        title: 'Golden Sun Bakery',
        description: 'Lorem ipsum',
        amount: 19.55,
        type: 'income',
        category: 'Food',
        notes: 'Some notes',
    }
]

// Login to get user id and add the token in the headers
defaultUsers.forEach(user => {
    axios
        .post(loginApi, {
            email: user.email,
            password: user.password
        })
        .then(response => {
            const jwtToken = response.data.body.token

            defaultTransactions.forEach(transaction => {
                axios
                    .post(transactionsApi, transaction, {
                        headers: {
                            "Authorization": `Bearer ${jwtToken}`
                        }
                    })
                    .then(response => console.log(response))
                    .catch(error => console.log(error))
            })
        })
        .catch(error => console.log(error))
})
