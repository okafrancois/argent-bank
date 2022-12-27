const axios = require('axios')
const signupApi = 'http://localhost:3001/api/v1/user/signup'

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

// Create default users
defaultUsers.forEach(user => {
    axios
        .post(signupApi, user)
        .catch(error => console.log(error))
})


