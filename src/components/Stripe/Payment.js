import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { createCustomer } from "../../redux/actions/userActions";
import axios from "axios";
import baseUrl from "../../url";

class Payment extends React.Component {
  // state = {
  //   token: {}
  // };

  onToken = token => {
    this.addCustomer(token);
    // TODO: Send the token information and any other
    // relevant information to your payment process
    // server, wait for the response, and update the UI
    // accordingly. How this is done is up to you. Using
    // XHR, fetch, or a GraphQL mutation is typical.
    // this.props.createCharge();
    // this.props.createCustomer(token);
    console.log(token);
  };

  addCustomer = body => {
    axios
      .post(`${baseUrl}/payment/create_customer`, body)
      .then(res => console.log(res.data))
      .catch(err => console.log("Frontend error:", err));
  };

  render() {
    // const amount = this.props;
    return (
      <StripeCheckout
        // amount={this.props}
        // amount={100}
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
