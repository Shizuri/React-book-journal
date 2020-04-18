// This component displays the user's journal entry for the book that he is reading.
import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { JournalContext } from './journalContext'
import './JournalEntryDetails.css'
import Ratings from 'react-ratings-declarative'

const JournalEntryDetails = props => {
    // If the page is loaded directly by its URL, make sure that it's a valid journal entry
    let properlyLoaded = true
    // Get the book id that is sent as the book parameter in the URL
    const { bookId } = useParams()
    let bookTitle, bookThumbnail

    // Get the removeBookFromJournal and myBooks function needed from journalContext
    const { myBooks, removeBookFromJournal } = useContext(JournalContext)
    try {
        ({ bookTitle, bookThumbnail } = myBooks.filter(book => book.bookId === bookId)[0])
    } catch (error) {
        properlyLoaded = false
    }

    // Needed to redirect back to /journal after the book has been removed
    const history = useHistory()

    // State for display data
    const [startDate, setStartDate] = useState('')
    const [finishDate, setFinishDate] = useState('')
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
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
            // Hold state if the entry has had its first edit
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
                        {hasEntry ?
                            <div className='JournalEntryDetails-right-panel'>
                                <div className='JournalEntryDetails-date'><span className='JournalEntryDetails-descriptor'>Started reading on:
                                </span> {startDate ? startDate : <i>no entry</i>}</div>
                                <div className='JournalEntryDetails-date'><span className='JournalEntryDetails-descriptor'>Finished reading on:
                                </span> {finishDate ? finishDate : <i>no entry</i>}</div>
                                <div className='JournalEntryDetails-rating'><span className='JournalEntryDetails-descriptor'>My rating:</span>
                                    <Ratings
                                        rating={rating}
                                        widgetRatedColors='#9dd1fe'
                                        widgetEmptyColors='#FFF3CD'
                                        widgetHoverColors='#9dd1fe'
                                        widgetSpacings='5px'
                                        widgetDimensions='45px'
                                    // changeRating={setRating} this way, by omitting changeRating from the props, the component is used only for display
                                    >
                                        <Ratings.Widget />
                                        <Ratings.Widget />
                                        <Ratings.Widget />
                                        <Ratings.Widget />
                                        <Ratings.Widget />
                                    </Ratings>
                                </div>
                                <div className='JournalEntryDetails-review'><span className='JournalEntryDetails-descriptor'>My review:
                                </span> {review ? review : <i>no entry</i>}</div>
                                <div className='JournalEntryDetails-notes'><span className='JournalEntryDetails-descriptor'>Additional notes:
                                </span> {notes ? notes : <i>no entry</i>}</div>
                            </div>
                            : <p className='JournalEntryDetails-right-panel'>Nothing written about <i>{bookTitle}.</i>
                            You can do so by clicking the Add Journal Entry button</p>}
                    </div>
                    <div className='JournalEntryDetails-buttons-panel'>
                        <Link to={`edit/${bookId}`} className='JournalEntryDetails-add-edit-button'>{`${hasEntry ? 'Edit' : 'Add'} Journal Entry`}</Link>
                        <button onClick={handleRemoveBook} className='JournalEntryDetails-remove-book-button'>Remove from Journal</button>
                    </div>
                    <button onClick={() => history.push('/journal')} className='JournalEntryDetails-back-button'>Back</button>
                </div>
                : <h2>This journal entry does not exist.</h2>
            }
        </div>
    )
}

export default JournalEntryDetails