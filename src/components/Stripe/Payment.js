import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { createStripeCustomer } from "../../redux/actions/authActions";

class Payment extends React.Component {
  onToken = token => {
    this.addCustomer(token);
  };
  addCustomer = body => {
    this.props.createStripeCustomer(body);
  };
  render() {
    return (
      <StripeCheckout
        billingAddress
        description="Please enter this email associated with this account."
        locale="auto"
        stripeKey="pk_test_paiLlNo6bPnrx0Nnb2ORgRLu00CRdEJXhe"
        token={this.onToken}
        zipCode
        label="Update Payment Information"
      />
    );
  }
}

export default connect(
  null,
  { createStripeCustomer }
)(Payment);
