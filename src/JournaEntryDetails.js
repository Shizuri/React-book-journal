// This component displays the users journal entry for the book that he is reading.
import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { JournalContext } from './journalContext'
import './JournalEntryDetails.css'

const JournaEntryDetails = props => {
    // If the page is loaded directly by its url, make sure that it's a valid journal entry
    let properlyLoaded = true
    // Get the book id that is sent as the book parametar in the URL
    const { bookId } = useParams()
    let bookTitle, bookThumbnail
    const myBooks = JSON.parse(localStorage.getItem('books') || '[]')
    try {
        ({ bookTitle, bookThumbnail } = myBooks.filter(book => book.bookId === bookId)[0])
    } catch (error) {
        properlyLoaded = false
    }

    // Needed to redirect back to /journal after the book has been removed
    const history = useHistory()

    // Get the removeBookFromJournal function needed from journalContext
    const { removeBookFromJournal } = useContext(JournalContext)

    // State for display data
    const [startDate, setStartDate] = useState('')
    const [finishDate, setFinishDate] = useState('')
    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')
    const [notes, setNotes] = useState('')
    const [hasEntry, setHasEntry] = useState(false)

    // Provide a confirmation and page redirection after the book is removed from the Journal
    const handleRemoveBook = () => {
        if (window.confirm(`Are you sure that you want to remove ${bookTitle} from your Journal?`)) {
            removeBookFromJournal(bookId)
            history.push('/journal')
        }
    }

    useEffect(() => {
        // Read data from localStorage and set it to state for display
        const journalEntry = JSON.parse(localStorage.getItem(bookId))
        if (journalEntry !== null) {
            setStartDate(journalEntry.startDate)
            setFinishDate(journalEntry.finishDate)
            setReview(journalEntry.review)
            setRating(journalEntry.rating)
            setNotes(journalEntry.notes)

            setHasEntry(true)
        }

        document.title = bookTitle
    }, [bookId, bookTitle])

    return (
        <div className='JournalEntryDetails-prime'>
            {properlyLoaded ?
                <div className='JournalEntryDetails'>
                    <h3>Journal entry about <i>{bookTitle}</i></h3>
                    <div className='JournalEntryDetails-container'>
                        <Link to={`/book-browser/${bookId}`} className='JournalEntryDetails-left-panel'>
                            <img src={bookThumbnail} alt={bookTitle} className='JournalEntryDetails-img' />
                            <div className='JournalEntryDetails-link-notification'>
                                Book Details
                            </div>
                        </Link>
                        <div className='JournalEntryDetails-right-panel'>
                            <p><span className='JournalEntryDetails-descriptor'>Started reading on:</span> {startDate}</p>
                            <p><span className='JournalEntryDetails-descriptor'>Finished reading on:</span> {finishDate}</p>
                            <p><span className='JournalEntryDetails-descriptor'>My rating:</span> {rating}</p>
                            <p><span className='JournalEntryDetails-descriptor'>My review:</span> {review}</p>
                            <p><span className='JournalEntryDetails-descriptor'>Additional notes:</span> {notes}</p>
                        </div>
                    </div>
                    <div className='JournalEntryDetails-buttons-panel'>
                        <Link to={`edit/${bookId}`} className='JournalEntryDetails-add-edit-button'>{`${hasEntry ? 'Edit' : 'Add'} Journal Entry`}</Link>
                        <button onClick={handleRemoveBook} className='JournalEntryDetails-remove-book-button'>Remove from Journal</button>
                    </div>
                    <button onClick={history.goBack} className='JournalEntryDetails-back-button'>Back</button>
                </div>
                : <h2>This journal entry does not exist.</h2>
            }
        </div>
    )
}

export default JournaEntryDetails