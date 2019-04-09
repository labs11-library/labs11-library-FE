import React from "react";
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  padding: 10px;

  h1, p {
    padding: 5px;
  }

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }
`

const UserProfileCard = props => {
  const { firstName, lastName, email, bio, picture } = props.loggedInUser;
  return (
    <ProfileWrapper>
      <div>
        <Avatar
          src={picture}
          style={{height: "80px", width: "80px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)", padding: "5px"}}
        />
      </div>
      <div>
        <h1>
          {firstName} {lastName}
        </h1>
        <p>
          {email}
        </p>
        <p>{bio}</p>
      </div>
    </ProfileWrapper>
  );
};

export default UserProfileCard;
