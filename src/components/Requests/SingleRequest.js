import React, { Component } from "react";
import "@progress/kendo-theme-material/dist/all.css";
import { connect } from "react-redux";
import { getSingleCheckoutRequest } from "../../redux/actions/checkoutActions.js";
import ChatApp from "../Chat/ChatApp";
import { getLoggedInUser } from "../../redux/actions/authActions.js";
import Auth from "../Auth/Auth";
import { Link } from "react-router-dom";
import { ChatWrapper, BackButtonWrapper, ChatButtonWrapper } from "../Styles/ChatStyles";
import Button from "@material-ui/core/Button";
import Loading from "../Loading/Loading.js";
class SingleRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleCheckoutRequest: {}
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getSingleCheckoutRequest(
      userId,
      this.props.match.params.checkoutRequestId
    );
    this.props.getLoggedInUser();
  }

  render() {
    if (this.props.loadingRequests || this.props.singleCheckoutRequest.lenderId === undefined) {
      return <Loading />;
    }
    const {
      title,
      authors,
      borrower,
      borrowerId,
      lender,
      lenderId
    } = this.props.singleCheckoutRequest;
    const lenderBorrowerName =
      lenderId.toString() === localStorage.getItem("userId")
        ? borrower
    : lender;
    return (
      <>
        <BackButtonWrapper>
          <Link to="/notifications" style={{textDecoration: "none"}}>
            <Button 
                color="primary" 
                variant="outlined" 
              >← Back</Button>
          </Link>
        </BackButtonWrapper>
        <ChatWrapper>
          <ChatButtonWrapper>
            <Link to="/notifications" style={{textDecoration: "none"}}>
              <Button 
                  color="primary" 
                  variant="outlined" 
                >← Back</Button>
            </Link>
          </ChatButtonWrapper>
            {this.state.error ? (
              <h2>
                {lender} hasn't accepted your previous request yet. Talk to{" "}{borrower} about exchanging {title.substr(0, 25)}{title.length > 25 && "..."}
              </h2>
            ) : (
              <h2>
                Talk to {lenderBorrowerName} about exchanging {title.substr(0, 25)}{title.length > 25 && "..."}
              </h2>
            )}
          <ChatApp user={this.props.loggedInUser} otherUserId={borrowerId} />
        </ChatWrapper>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadingRequests: state.checkoutReducer.fetchingSingleCheckoutRequest,
    singleCheckoutRequest: state.checkoutReducer.singleCheckoutRequest,
    loggedInUser: state.authReducer.loggedInUser,
    error: state.checkoutReducer.error
  };
};

export default connect(
  mapStateToProps,
  { getSingleCheckoutRequest, getLoggedInUser }
)(Auth(SingleRequest));
