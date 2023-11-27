const express = require('express');
const { initializeTransaction, createWallet } = require('../controllers/walletController');
const { protectUser } = require('../middlewares/authMiddleware');


const router = express.Router()


// VIRTUAL WALLET
router.post('/create-wallet', protectUser, createWallet)
router.post('/', protectUser, initializeTransaction)




module.exports = router