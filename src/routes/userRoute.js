const express = require('express');
const { userLogin, registerEmail, verifyEmail, userInfo, forgetPassword, resetPassword, setupPin } = require('../controllers/userController');
const { protectUser } = require('../middlewares/authMiddleware');

const router = express.Router()

router.post('/signup', registerEmail);
router.post('/verify-account', verifyEmail);
router.post('/', protectUser, userInfo);
router.post('/login', userLogin);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);
router.post('/set-pin', protectUser, setupPin);


module.exports = router