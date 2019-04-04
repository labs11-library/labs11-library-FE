import React from "react";
import { Route } from "react-router-dom";

import InventoryList from "../Inventory/InventoryList.js";
import ProfileNavBar from "./ProfileNavBar.js";
import CheckedOutList from "../CheckedOut/CheckedOutList.js";
import BookSearch from "../AddBook/BookSearch.js";
import UserProfile from "./UserProfile.js";
import RequestList from "../Requests/RequestList.js";
import SingleRequest from "../Requests/SingleRequest.js";
import SingleCheckedOutBook from "../CheckedOut/SingleCheckedOutBook.js";

const MyLibrary = props => {
  return (
    <div>
      <React.Fragment>
        <ProfileNavBar />
        <Route
          exact
          path="/my-library/inventory"
          render={props => <InventoryList {...props} />}
        />
        <Route
          exact
          path="/my-library/add-book"
          render={props => <BookSearch {...props} />}
        />
        <Route
          exact
          path="/my-library/checkouts"
          render={props => <CheckedOutList {...props} />}
        />
        <Route
          exact
          path="/my-library/checkout/:checkoutId"
          render={props => <SingleCheckedOutBook {...props} />}
        />
        <Route
          exact
          path="/my-library/my-info"
          render={props => <UserProfile {...props} />}
        />
        <Route
          exact
          path="/my-library/requests"
          render={props => <RequestList {...props} />}
        />
        <Route
          exact
          path="/my-library/requests/:checkoutRequestId"
          render={props => <SingleRequest {...props} />}
        />
      </React.Fragment>
    </div>
  );
};

export default MyLibrary;
