const express = require('express');
const { initializeTransaction } = require('../controllers/walletController');
const { protectUser } = require('../middlewares/authMiddleware');


const router = express.Router()


// VIRTUAL WALLET
router.post('/', protectUser, initializeTransaction)



module.exports = router