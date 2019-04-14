import React, { Component } from "react";

import { connect } from "react-redux";
import { getCheckouts } from "../../redux/actions/checkoutActions";
import { TransactionWrapper } from "../Styles/TransactionsStyles";
import * as moment from "moment";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Auth from "../Auth/Auth";
// import classes from "*.module.sass";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#325C6C",
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    padding: 16
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

class Transactions extends Component {
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    this.props.getCheckouts(userId);
  }

  formatDate = date => {
    return moment
      .utc(date)
      .local()
      .format("MM-DD-YYYY");
  };

  render() {
    return (
      <TransactionWrapper>
        <h2>Transaction History</h2>
        <Paper style={{ overflowX: "scroll" }}>
          <Table>
            <TableHead>
              <TableRow>
                <CustomTableCell style={{ padding: "1rem" }}>#</CustomTableCell>
                <CustomTableCell style={{ padding: "1rem" }} align="left">
                  Borrower
                </CustomTableCell>
                <CustomTableCell style={{ padding: "1rem" }} align="left">
                  Book
                </CustomTableCell>
                <CustomTableCell style={{ padding: "1rem" }} align="left">
                  Checkout Date
                </CustomTableCell>
                <CustomTableCell style={{ padding: "1rem" }} align="left">
                  Due Date
                </CustomTableCell>
                <CustomTableCell style={{ padding: "1rem" }} align="left">
                  Returned Date
                </CustomTableCell>
                {/* <CustomTableCell style={{ padding: "1rem" }} align="left">
                  Overdue?
                </CustomTableCell> */}
                <CustomTableCell style={{ padding: "1rem" }} align="left">
                  Late Fee
                </CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.checkouts
                .map(
                  (checkout, index) =>
                    checkout.returned && (
                      <TableRow>
                        <CustomTableCell style={{ textAlign: "left" }}>
                          {index + 1}
                        </CustomTableCell>
                        <CustomTableCell>{checkout.borrower}</CustomTableCell>
                        <CustomTableCell>
                          {checkout.title.substr(0, 25)}
                          {checkout.title.length > 25 && "..."}
                        </CustomTableCell>
                        <CustomTableCell>
                          {this.formatDate(checkout.checkoutDate)}
                        </CustomTableCell>
                        <CustomTableCell>
                          {this.formatDate(checkout.dueDate)}
                        </CustomTableCell>
                        <CustomTableCell>
                          {this.formatDate(checkout.returnedDate)}
                        </CustomTableCell>
                        {/* <CustomTableCell>
                          {checkout.overdue ? "Yes" : "No"}
                        </CustomTableCell> */}
                        <CustomTableCell>
                          {checkout.lateFee ? `$${checkout.lateFee}` : "None"}
                        </CustomTableCell>
                      </TableRow>
                    )
                )
                .sort(this.props.checkouts.checkoutId)}
            </TableBody>
          </Table>
        </Paper>
      </TransactionWrapper>
    );
  }
}

const mapStateToProps = state => ({
  checkouts: state.checkoutReducer.checkouts
});

const TransactionsComponent = connect(
  mapStateToProps,
  { getCheckouts }
)(Transactions);

export default Auth(withStyles(styles)(TransactionsComponent));
