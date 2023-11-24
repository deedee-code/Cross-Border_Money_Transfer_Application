const User = require('../models/userModel');
const bcrypt = require('bcrypt')


const editProfile = async (req, res) => {
    const userId = req.params.id
    const { firstName, lastName, email, tag, phoneNumber } = req.body

    const currentUser = await User.findById(userId)
    if (!currentUser) {
        return res.status(400).json({ message: "Invalid User ID!" })
    }

    currentUser.firstName = firstName;
    currentUser.lastName = lastName;
    currentUser.email = email;
    currentUser.tag = tag;
    currentUser.phoneNumber = phoneNumber;

    await currentUser.save()

    const user = { ...currentUser._doc }
    delete user.password
    delete user.pin

    return res.status(200).json({ message: "User Profile Updated Successfully", status: 200, success: true, data: { user } })
}


const changePassword = async (req, res) => {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "All fields are required!" })
    }

    const user = await User.findById(userId)
    if (!user) {
        return res.status(400).json({ message: "Invalid User ID!" })
    }


    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect current password" })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword

    await user.save()

    const currentUser = { ...user._doc }
    delete currentUser.password
    delete currentUser.pin

    return res.status(200).json({ message: "Password changed Successfully", status: 200, success: true, data: { currentUser } })
}



const changePin = async (req, res) => {
    const userId = req.params.id
    const { pin, newPin } = req.body

    const user = await User.findById(userId)
    if (!user) {
        return res.status(400).json({ message: "Invalid User ID!" })
    }

    const isPinCorrect = await bcrypt.compare(pin, user.pin);
    if (!isPinCorrect) {
        return res.status(401).json({ message: 'Invalid current PIN' });
    }

    const hashedPin = await bcrypt.hash(newPin, 10);

    user.pin = hashedPin;

    await user.save();

    const currentUser = { ...user._doc }
    delete currentUser.pin
    delete currentUser.password

    // Return success message
    return res.status(200).json({ message: "PIN changed successfully", status: 200, success: true, data: { currentUser } })
}



const deleteProfile = async (req, res) => {
    const userId = req.params.id

    const user = await User.findById(userId)
    if (!user) {
        return res.status(400).json({ message: "Invalid User ID!" })
    }

    await user.deleteOne()

    return res.status(200).json({ message: "User deleted Successfully", status: 200, success: true })
}



exports.editProfile = editProfile;
exports.changePassword = changePassword;
exports.changePin = changePin;
exports.deleteProfile = deleteProfile;
