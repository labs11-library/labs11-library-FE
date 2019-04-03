import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { createCustomer } from "../../redux/actions/userActions";

class Payment extends React.Component {
  state = {
    token: {}
  };

  onToken = (token, addresses) => {
    // TODO: Send the token information and any other
    // relevant information to your payment process
    // server, wait for the response, and update the UI
    // accordingly. How this is done is up to you. Using
    // XHR, fetch, or a GraphQL mutation is typical.
    // this.props.createCharge();
    // this.props.createCustomer(this.state.token);
    console.log(token);
  };

  render() {
    return (
      <StripeCheckout
        // amount={this.props}
        amount={100}
        billingAddress
        description="Bookmaps Membership"
        // image="https://yourdomain.tld/images/logo.svg"
        locale="auto"
        // name="YourDomain.tld"
        stripeKey="pk_test_paiLlNo6bPnrx0Nnb2ORgRLu00CRdEJXhe"
        token={this.onToken}
        zipCode
        label="Click here to become a member!"
      />
    );
  }
}

export default connect(
  null,
  { createCustomer }
)(Payment);
