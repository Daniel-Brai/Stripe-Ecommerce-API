// read environment variables 
const dotenv = require('dotenv')
dotenv.config({path: './.env'})

// import stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// 
const chargeCustomer = async ( req, res ) => { 
    const token = req.body.tokenId; 

    await stripe.charges.create({
        source: token,
        amount: req.body.amount,
        currency: 'usd',
        // or source: 'ngn'
        description: 'The charge on your order',
    }, (stripeError, stripeResponse) => {
        if (stripeError) { 
            res.status(500).json(stripeError);
        }
        res.status(200).json(stripeResponse);
    });
}

module.exports = { chargeCustomer }