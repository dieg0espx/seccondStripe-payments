import express from "express"
const app = express()

import dotenv from 'dotenv';
dotenv.config();

import stripee from "stripe";
import bodyParser from 'body-parser';
import cors from "cors"


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())


app.post("/payment", cors(), async (req, res) => {
	let { amount, id, description, propertyName } = req.body

	const Diego = process.env.DIEGO_SECRET_KEY;
	const David = process.env.DAVID_SECRET_KEY;
	const PJInvestments = process.env.PJINVESTMENTS_SECRET_KEY;
	const Phill = process.env.PHILL_SECRET_KEY;
	const RCHomes = process.env.RCHOMES_SECRET_KEY;
	const RockCity = process.env.ROCKCITY_SECRET_KEY;

	console.log(Diego[1]);
	
	
	let stripe = stripee();

	switch (propertyName) {
		case "Tuneberg":
			stripe = stripee(Diego);
		  break;
		case " Oak Park Game Room":
		  console.log("David");
		  stripe = stripee(David);
		  break;
		case "Mario's Pad":
		  console.log("David");
		  stripe = stripee(David);
		  break;
		case "Sentinel":
		  console.log("PJ INVESTMENTS");
		  stripe = stripee(PJInvestments);
		  break;
		case "Marigold":
		  console.log("Phill");
		  stripe = stripee(Phill);
		  break;
		case "Landstrom":
		  console.log("Phill");
		  stripe = stripee(Phill);
		  break
		case "Golfers Retreat":
		  console.log("Phill");
		  stripe = stripee(Phill);
		  break;
		case "The Pool House":
		  console.log("RC HOMEs");
		  stripe = stripee(RCHomes);
		  break;
		case "The lake house":
		  console.log("ROCK CITY HOMES");
		  stripe = stripee(RockCity);
		  break;  
	    default:
		  console.log("PROPERTY HAS NOT STRIPE OWNER");
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