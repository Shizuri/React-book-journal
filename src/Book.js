import React from 'react'
import BookCoverNotAvailable from './images/BookCoverNotAvailable.png'

const Book = props => {
    const {title, subtitle, authors, imageLinks} = {...props.book.volumeInfo}
    return(
        <div style={{border: '1px solid black', width: '80%', margin: '0px auto 10px'}}>
            {title} {subtitle ? ` - ${subtitle}` : ''} <b>by</b> {authors ? authors.map(author => author) : <i>authors missing</i>}
            <img src={imageLinks ? imageLinks.thumbnail : BookCoverNotAvailable} alt={title}/>
        </div>
    )
}

export default Book