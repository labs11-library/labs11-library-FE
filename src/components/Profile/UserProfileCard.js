import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { ProfileWrapper, Bio } from "../Styles/UserProfileCardStyles";

const UserProfileCard = props => {
  const { firstName, lastName, email, bio, picture } = props.loggedInUser;

  return (
    <ProfileWrapper>
      <Avatar
        src={picture}
        style={{
          height: "100px",
          width: "100px",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"
        }}
      />
      <h1>
        {firstName} {lastName}
      </h1>
      <p>{email}</p>
      <Bio>
        {bio === "" || bio === null
          ? "You have not provided a bio yet! Please provide a few sentence description of your interests so that other users can get to know you better."
          : bio}
      </Bio>
    </ProfileWrapper>
  );
};

export default UserProfileCard;
