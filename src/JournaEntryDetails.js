// This component displays the users journal entry for the book that he is reading.
import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { JournalContext } from './journalContext'

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
        }
    }, [bookId])

    return (
        <div>
            {properlyLoaded ?
                <>
                    <p>My Journal entry about <b>{bookTitle}</b></p>
                    <img src={bookThumbnail} alt={bookTitle} />
                    <p>Started reading on: {startDate}</p>
                    <p>Finished reading on: {finishDate}</p>
                    <p>My rating: {rating}</p>
                    <p>My review: {review}</p>
                    <p>Additional notes: {notes}</p>
                    <Link to={`edit/${bookId}`}> Add / Edit Journal Entry</Link>
                    <button onClick={handleRemoveBook}>Remove Book and Entry from Journal</button>
                </>
                : <h2>This journal entry does not exist.</h2>
            }
        </div>
    )
}

export default JournaEntryDetails