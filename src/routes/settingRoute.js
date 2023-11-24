const express = require('express');
const { editProfile, deleteProfile, changePassword, changePin } = require('../controllers/profileController');
const { protectUser } = require('../middlewares/authMiddleware');

const router = express.Router()


// EDIT
router.put('/:id/edit', protectUser, editProfile);
router.put('/:id/change-password', protectUser, changePassword);
router.put('/:id/change-pin', protectUser, changePin);
router.delete('/:id', protectUser, deleteProfile);


module.exports = router