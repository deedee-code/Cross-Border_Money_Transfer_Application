const express = require('express');
const { getTransactionHistory } = require('../controllers/transactionController');
const { protectUser } = require('../middlewares/authMiddleware');


const router = express.Router()


// TRANSACTIONS
router.get('/', protectUser, getTransactionHistory)




module.exports = router