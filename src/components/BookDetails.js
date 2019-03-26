import React from 'react'
import styled from 'styled-components'

const BookDetailsWrapper = styled.div`
  width: 60vw;
  border-bottom: 2px solid grey;
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  height: 400px;
`
const BookImgWrapper = styled.div`
  width: 250px;
  height: 375px;
`
const BookImg = styled.img`
  width: 100%;
  height: 100%;
`

const Availability = styled.p`
  color: ${props => props.available ? "green" : "red"};
`

const BookDetails = (props) => {
  const { title, author, image, lenderName, location, available } = props.book
  const availability = available ? "Available" : "Checked out"

  return (
    <BookDetailsWrapper>
      <BookImgWrapper>
        <BookImg alt={title} src={image}/>
      </BookImgWrapper>
      <div>
        <h2>{title}</h2>
        <p>by {author}</p>
        <Availability available={available}>{availability}</Availability>
        <p>Contact {lenderName} from {location}</p>
        <button>Send message</button>
      </div>
    </BookDetailsWrapper>
  )
}
export default BookDetails
