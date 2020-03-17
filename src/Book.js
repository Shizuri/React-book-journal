// This is a display component used in BookBrowser
// It also provides the functionality of adding a book to the Book Journal
import React, { useContext } from 'react'
import BookCoverNotAvailable from './images/BookCoverNotAvailable.png'
import { Link, useRouteMatch } from 'react-router-dom'
import { JournalContext } from './journalContext'
import './Book.css'
import useFormatAuthors from './hooks/useFormatAuthors'

const Book = props => {
    const { title, subtitle, authors, imageLinks } = { ...props.book.volumeInfo } // Destructure the needed data from the props
    const { id } = { ...props.book } // Destructure the needed data from the props

    const { url } = useRouteMatch(); // Get the current URL from react-router (can be hard coded, but this is a better coding practice)
    const { myBooks, addBookToJournal } = useContext(JournalContext) // Data and functions provided by the Journal Context

    const img = imageLinks ? imageLinks.thumbnail : BookCoverNotAvailable // The Google Books API just ommits the imageLinks property if there are no images
    const bookIsInJournal = myBooks.some(book => book.bookId === id) // Check if the book is already in the Journal

    const cleanedAuthor = useFormatAuthors(authors) // Format the author array for display

    return (
        <div className='Book'>
            <Link to={`${url}/${id}`} className='Book-link'>
                <div className='Book-container'>
                    <img src={img} alt={title} />
                    <h2>{title}</h2>
                    {subtitle && <span className='Book-subtitle'>{subtitle}</span>}
                    {cleanedAuthor}
                    {bookIsInJournal ?
                        <span>Book already in Journal</span>
                        : <button onClick={() => addBookToJournal({ id, title, img, subtitle, authors })}>Add to Journal</button>}
                </div>
            </Link>
        </div>
    )
}

export default Book

// Display component to show all the information in the queried list of books