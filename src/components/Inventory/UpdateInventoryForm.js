import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { BookImgWrapper, BookImg, SaveChangesButton } from "../Styles/InventoryStyles";

const Availability = styled.p`
  color: ${props => (props.available ? "green" : "red")};
`;

class UpdateInventoryForm extends Component {
  state = {
    description: `${this.props.singleInventory.description}`
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  

  render() {
    const {
      title,
      authors,
      image,
      available,
      availability
    } = this.props.singleInventory;
    return (
      <div>
        <BookDetailsWrapper>
          <BookImgWrapper>
            <BookImg alt={title} src={image} />
          </BookImgWrapper>
          <BookContentWrapper>
            <h2>{title}</h2>
            <p>by {authors}</p>
            <Availability available={available}>{availability}</Availability>
            <div>
            <TextField
              type="text"
              label="Description"
              name="description"
              fullWidth
              value={this.state.description}
              onChange={this.handleChange}
              style={{ padding: "5px" }}
            />
          </div>
            <SaveChangesButton>
              <Button color="primary" variant="contained" onClick={() => this.props.editInventory(this.state)}>Save changes</Button>
            </SaveChangesButton>
          </BookContentWrapper>
        </BookDetailsWrapper>
      </div>
    );
  }
}

export default UpdateInventoryForm;

const BookDetailsWrapper = styled.div`
  display: flex;
  height: 180px;

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
`;
const BookContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  padding-right: 5px;
  position: relative;
`