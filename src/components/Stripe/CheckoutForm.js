import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

// Defines a component that displays CardElement and submit button
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  // this method tokenizes the card information and sends it to the server
  // stripe prop is available inside this component due to injectStripe wrapping CheckoutForm
  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await fetch("http://localhost:9001/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) this.setState({ complete: true });
  }

  // Card Element creates input fields for Card #, Exp date and CVV
  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

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
