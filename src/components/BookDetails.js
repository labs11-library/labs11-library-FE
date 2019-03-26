import React from 'react'

const BookDetails = (props) => {
  const { title, author, image, lenderName, location } = props.book
  return (
    <div>
      <h2>{title}</h2>
      <p>by {author}</p>
      <img alt={title} src={image}/>
      <p>Contact {lenderName} from {location}</p>
      <button>Send message</button>
    </div>
  )
}

export default BookDetails
