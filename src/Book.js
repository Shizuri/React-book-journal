import React from 'react'
import BookCoverNotAvailable from './images/BookCoverNotAvailable.png'
import { Link, useRouteMatch } from 'react-router-dom'

const Book = props => {
    const { title, subtitle, authors, imageLinks } = { ...props.book.volumeInfo }
    const { url } = useRouteMatch();
    return (
        <div style={{ border: '1px solid black', width: '80%', margin: '0px auto 10px' }}>
            {title} {subtitle ? ` - ${subtitle}` : ''} <b>by</b> {authors ? authors.map(author => author) : <i>authors missing</i>}
            <Link to={`${url}/${props.book.id}`}><img src={imageLinks ? imageLinks.thumbnail : BookCoverNotAvailable} alt={title} /></Link>
        </div>
    )
}

export default Book

// Display component to show all the information in the queried list of books