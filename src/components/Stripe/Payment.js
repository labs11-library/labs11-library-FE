import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";

// StripeProvider initializes stripe and passes the publihsbale key
// Elements creats an Elements group, indicating which stripe elements are related (input fields)
// The Elements must contain the component that is wrappe dwith injectStripe(), not the other way around.
class Payment extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_paiLlNo6bPnrx0Nnb2ORgRLu00CRdEJXhe">
        <div className="example">
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default Payment;
