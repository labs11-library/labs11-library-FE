import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm.js";
import { renderComponent } from "recompose";

class Payment extends Component {
	render() {
		return (
			<StripeProvider apiKey="pk_test_Lk7CkE4Yez5LYD3KvwJwoYN500AVGVDnfZ">
				<div>
					<h1>Stripe Payment Test</h1>
					<Elements>
						<CheckoutForm />
					</Elements>
				</div>
			</StripeProvider>
		);
	}
}

export default Payment;
