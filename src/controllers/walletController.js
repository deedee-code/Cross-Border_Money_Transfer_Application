const https = require('https')

const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

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

    const reqPaystack = https.request(options, resPaystack => {
        let data = ''

        resPaystack.on('data', (chunk) => {
            data += chunk
        });

        resPaystack.on('end', () => {
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



exports.initializeTransaction = initializeTransaction;