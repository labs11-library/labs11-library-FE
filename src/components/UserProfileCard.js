import React from "react";

const UserProfileCard = props => {
  const { firstName, lastName, email, bio } = props.loggedInUser;
  return (
    <div>
      <h2>
        Name: {firstName} {lastName}
      </h2>
      <p>Email: {email}</p>
      <p>Bio: {bio}</p>
    </div>
  );
};

export default UserProfileCard;
