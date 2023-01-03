const User = require('../database/models/userModel')
const Transaction = require('../database/models/transactionModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.createUser = async serviceData => {
  try {
    const user = await User.findOne({ email: serviceData.email })
    if (user) {
      throw new Error('Email already exists')
    }

    const hashPassword = await bcrypt.hash(serviceData.password, 12)

    const newUser = new User({
      email: serviceData.email,
      password: hashPassword,
      firstName: serviceData.firstName,
      lastName: serviceData.lastName,
      balance: serviceData.balance,
      transactions: []
    })

    return await newUser.save()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.getUserProfile = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOne({ _id: decodedJwtToken.id })

    if (!user) {
      throw new Error('User not found!')
    }

    const userData = user.toObject()

    // return only the data we need
    return {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      balance: userData.balance
    }

  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.loginUser = async serviceData => {
  try {
    const user = await User.findOne({ email: serviceData.email })

    if (!user) {
      throw new Error('User not found!')
    }

    const isValid = await bcrypt.compare(serviceData.password, user.password)

    if (!isValid) {
      throw new Error('Password is invalid')
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || 'default-secret-key',
      { expiresIn: '1d' }
    )

    return { token }
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.updateUserProfile = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id },
      {
        firstName: serviceData.body.firstName,
        lastName: serviceData.body.lastName
      },
      { new: true }
    )

    if (!user) {
      throw new Error('User not found!')
    }

    return user.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.createTransaction = async serviceData => {
  try {
    const transaction = await Transaction.findOne({ _id: serviceData.body._id });

    if (transaction) {
      throw new Error('Transaction already exists');
    }

    // Extract the userId value from the token
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const userId = decodedJwtToken.id;

    const newTransaction = new Transaction({
      userId: userId,
      title: serviceData.body.title,
      description: serviceData.body.description,
      amount: serviceData.body.amount,
      newBalance: null,
      type: serviceData.body.amount > 0 ? 'income' : 'expense',
      category: serviceData.body.category,
      notes: serviceData.body.notes,
      card: serviceData.body.card,
    });

    const user = await User.findOne({ _id: userId });

    // Update the user balance with the new transaction amount
    const updatedBalance = user.balance + serviceData.body.amount;
    user.balance = updatedBalance;
    newTransaction.newBalance = updatedBalance;


    // Add the new transaction to the user's transactions array
    user.transactions.push(newTransaction);

    // Save the user model with the updated balance and transactions array
    await user.save();

    // Save and return the new transaction
    return await newTransaction.save();
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};

module.exports.getTransactions = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim();
    const decodedJwtToken = jwt.decode(jwtToken);
    const user = await User.findOne({ _id: decodedJwtToken.id }).populate('transactions');

    if (!user) {
      throw new Error('User not found!');
    }

    console.log('user', user);

    return user.transactions;
  } catch (error) {
    console.error('Error in userService.js', error);
    throw new Error(error);
  }
};

module.exports.updateTransaction = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOne({ _id: decodedJwtToken.id })


    if (!user) {
      throw new Error('User not found!')
    }

    const updates = {}
    serviceData.body.notes ? updates.notes = serviceData.body.notes : null
    serviceData.body.category ? updates.category = serviceData.body.category : null


    const transaction = await Transaction.findOneAndUpdate({
          _id: serviceData.body._id,
          userId: user._id
        },
        updates,
        {new: true}
    )

    if (!transaction) {
      throw new Error('Transaction not found!')
    }

    return transaction.toObject()

  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

module.exports.deleteTransaction = async serviceData => {
try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOne({ _id: decodedJwtToken.id })

    if (!user) {
      throw new Error('User not found!')
    }

    const transaction = await Transaction.findOneAndDelete({
      _id: serviceData.body._id,
      userId: user._id
    })

    if (!transaction) {
      throw new Error('Transaction not found!')
    }

    // Update the user balance with the new transaction amount
    const updatedBalance = user.balance - transaction.amount;
    user.balance = updatedBalance;

    // Remove the transaction from the user's transactions array
    user.transactions.pull(transaction._id);

    // Save the user model with the updated balance and transactions array
    await user.save();

    return transaction.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}
