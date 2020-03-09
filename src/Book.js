// This is a display component used in BookBrowser
// It also provides the functionality of adding a book to the Book Journal
import React, { useContext } from 'react'
import BookCoverNotAvailable from './images/BookCoverNotAvailable.png'
import { Link, useRouteMatch } from 'react-router-dom'
import { JournalContext } from './journalContext'

const Book = props => {
    const { title, subtitle, authors, imageLinks } = { ...props.book.volumeInfo } // Destructure the needed data from the props
    const { id } = { ...props.book } // Destructure the needed data from the props

    const { url } = useRouteMatch(); // Get the current URL from react-router (can be hard coded, but this is a better coding practice)
    const { myBooks, addBookToJournal } = useContext(JournalContext) // Data and functions provided by the Journal Context

    const img = imageLinks ? imageLinks.thumbnail : BookCoverNotAvailable // The Google Books API just ommits the imageLinks property if there are no images
    const bookIsInJournal = myBooks.some(book => book.bookId === id) // Check if the book is already in the Journal

    return (
        <div style={{ border: '1px solid black', width: '80%', margin: '0px auto 10px', backgroundColor: '#F8ECC2' }}>
            <Link to={`${url}/${id}`}>{title} {subtitle ? ` - ${subtitle}` : ''}</Link> <b>
                by</b> {authors ? authors.map(author => author) : <i>authors missing</i>}
            <Link to={`${url}/${id}`}><img src={img} alt={title} /></Link>
            {bookIsInJournal ?
                <span>Book already in Journal</span>
                : <button onClick={() => addBookToJournal(id, title, img)}>Add to Journal</button>}
        </div>
    )
}

export default Book

// Display component to show all the information in the queried list of books