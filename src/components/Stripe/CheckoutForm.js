import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

// Defines a component that displays CardElement and submit button
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    // User clicked submit
  }

  // Card Element creates input fields for Card #, Exp date and CVV
  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

// injectStripe, required on CheckoutForm, creates a new component with an injected stripe prop which contains a Stripe Object
export default injectStripe(CheckoutForm);
