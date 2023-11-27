const Wallet = require('../models/walletModel');
const https = require('https');

const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY


const createWallet = async (req, res) => {

    try {
        const userWallet = await Wallet.findOne({ userId: req.user._id })
        if (userWallet) {
            return res.status(400).json({ message: "Wallet already exists!" })
        }

        const newWallet = new Wallet({
            userId: req.user._id,
            currency: req.body.currency,
            walletBalance: req.body.walletBalance
        })

        await newWallet.save()

        return res.status(200).json({ message: "Wallet created!", status: 200, success: true, data: { userWallet: newWallet } })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', status: 500, success: false });
    }

}


const initializeTransaction = async (req, res) => {
    const email = req.body.email;
    const amount = req.body.amount;
    // params
    const params = JSON.stringify({
        "email": email,
        "amount": amount * 100
    })

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${SECRET_KEY}`,
            'Content-Type': 'application/json'
        }
    }

    const reqPaystack = https.request(options, async resPaystack => {
        let data = ''

        resPaystack.on('data', (chunk) => {
            data += chunk
        });

        resPaystack.on('end', async () => {

            console.log(JSON.parse(data))
            return res.status(200).send(data)
        })

    }).on('error', error => {
        console.error(error)
        return res.status(500).send(error)
    })

    reqPaystack.write(params)
    reqPaystack.end()

}




exports.createWallet = createWallet;
exports.initializeTransaction = initializeTransaction;

