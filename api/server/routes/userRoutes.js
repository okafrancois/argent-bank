const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const tokenValidation = require('../middleware/tokenValidation')

router.post('/signup', userController.createUser)

router.post('/login', userController.loginUser)

router.post(
  '/profile',
  tokenValidation.validateToken,
  userController.getUserProfile
)

router.put(
  '/profile',
  tokenValidation.validateToken,
  userController.updateUserProfile
)

router.post(
    '/transactions/new',
    userController.createTransaction
)

router.get(
    '/transactions',
    tokenValidation.validateToken,
    userController.getTransactions
)

router.put(
    '/transactions',
    tokenValidation.validateToken,
    userController.updateTransaction
)

router.post(
    '/transactions/delete',
    tokenValidation.validateToken,
    userController.deleteTransaction
)

module.exports = router
