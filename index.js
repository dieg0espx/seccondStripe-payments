import express from "express"
const app = express()

import dotenv from 'dotenv';
dotenv.config();

import stripee from "stripe";
// const stripe = stripee("sk_test_51NJ0hELJsUTWMJlYVlH4BVzNUCsJZGwHpFSTgY764aso5LXqzJ4kCiQ76yAry1cmE3RX6rcuG8XpLop7NrY9O9KS005TRB27Nd");

import bodyParser from 'body-parser';
// const bodyParser = require("body-parser")
import cors from "cors"


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(cors())

app.post("/payment", cors(), async (req, res) => {
	let { amount, id, description, propertyName } = req.body
	
	let stripe = stripee();
	switch (propertyName) {
		case 'Tuneberg':
			stripe = stripee("sk_test_51NJ0hELJsUTWMJlYVlH4BVzNUCsJZGwHpFSTgY764aso5LXqzJ4kCiQ76yAry1cmE3RX6rcuG8XpLop7NrY9O9KS005TRB27Nd");
			break;
		default:
			console.log("PROPERTY HAS NO OWNER");
			break;
	}

	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description,
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})


app.listen(process.env.PORT || 4000, () => {
	console.log("Sever is listening on port 4000")
})