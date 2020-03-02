import React, { useContext } from 'react'
import BookCoverNotAvailable from './images/BookCoverNotAvailable.png'
import { Link, useRouteMatch } from 'react-router-dom'
import { JournalContext } from './journalContext'

const Book = props => {
    const { title, subtitle, authors, imageLinks } = { ...props.book.volumeInfo }
    const { url } = useRouteMatch();
    const { addBookToJournal } = useContext(JournalContext)

    return (
        <div style={{ border: '1px solid black', width: '80%', margin: '0px auto 10px' }}>
            <Link to={`${url}/${props.book.id}`}>{title} {subtitle ? ` - ${subtitle}` : ''}</Link> <b>
                by</b> {authors ? authors.map(author => author) : <i>authors missing</i>}
            <Link to={`${url}/${props.book.id}`}><img src={imageLinks ? imageLinks.thumbnail : BookCoverNotAvailable} alt={title} /></Link>
            <button onClick={() => addBookToJournal(props.book.id, props.book.volumeInfo.title, props.book.volumeInfo.imageLinks.thumbnail)}>Add to Journal</button>
        </div>
    )
}

export default Book

// Display component to show all the information in the queried list of books