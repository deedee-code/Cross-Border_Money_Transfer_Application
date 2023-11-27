const Transaction = require('../models/transactionModel')


const getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id });

        return res.status(200).json({ status: 200, success: true, data: { transactions } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500, success: false });
    }
}



exports.getTransactionHistory = getTransactionHistory;