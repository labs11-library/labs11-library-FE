import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

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
      description,
      availability
    } = this.props.singleInventory;
    return (
      <div>
        <Link style={{ position: "absolute", left: "10px", textDecoration: "none" }} to="/my-library">
          <Button variant="outlined">← Back</Button>
        </Link>
        <BookDetailsWrapper>
          <BookImgWrapper>
            <BookImg alt={title} src={image} />
          </BookImgWrapper>
          <BookContentWrapper>
            <h2>{title}</h2>
            <p>by {authors}</p>
            <Availability available={available}>{availability}</Availability>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              placeholder="Edit the description of your book"
            />
            <Button onClick={() => this.props.editInventory(this.state)}>Save changes</Button>
          </BookContentWrapper>
        </BookDetailsWrapper>
      </div>
    );
  }
}

export default UpdateInventoryForm;

{/* <div>
      
        <Button onClick={() => this.props.editInventory(this.state)}>
          Save Updates
        </Button>
      </div> */}

      const BookDetailsWrapper = styled.div`
      display: flex;
      justify-content: space-between;
      height: 180px;
    
      h2 {
        font-size: 1.5rem;
      }
    
      p {
        font-size: 1rem;
      }
    `;
    const BookImgWrapper = styled.div`
      width: 120px;
      height: 180px;
    `;
    const BookImg = styled.img`
      width: 100%;
      height: 100%;
    `;
    const BookContentWrapper = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    `