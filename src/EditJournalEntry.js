import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const EditJournalEntry = props => {
    // Browsing history provided by react-router
    const history = useHistory()
    // Get the book information passed from JournalEntry as a Link state prop from react-router
    const { state: bookState } = useLocation()
    // If this page is accessed directly, without the needed data passed from the Link leading here, the App will crash. This prevents that.
    let properlyLoaded = true
    let bookId, bookTitle, bookThumbnail
    try {
        ({ bookId, bookTitle, bookThumbnail } = bookState.book)
    } catch (error) {
        properlyLoaded = false
        console.log(error)
    }

    const [startDate, setStartDate] = useState('')
    const [finishDate, setFinishDate] = useState('')
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(-1)
    const [notes, setNotes] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        console.log('startDate: ', startDate)
        console.log('finishDate: ', finishDate)
        console.log('rating: ', rating)
        console.log('review: ', review)
        console.log('notes: ', notes)
    }

    return (
        <div>
            {properlyLoaded ?
                <>
                    <p>Review value: {review}</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Started reading on:
                    <input
                                type='date'
                                name='startDate'
                                value={startDate}
                                onChange={event => setStartDate(event.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Finished reading on:
                    <input
                                type='date'
                                name='finishDate'
                                value={finishDate}
                                onChange={event => setFinishDate(event.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            My rating:
                    <input
                                type='number'
                                name='rating'
                                value={rating}
                                onChange={event => setRating(event.target.value)}
                                min='1'
                                max='5'
                            />
                        </label>
                        <br />
                        <label>
                            My review:
                    <input
                                type='text'
                                name='review'
                                value={review}
                                onChange={event => setReview(event.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Additional notes:
                    <input
                                type='text'
                                name='notes'
                                value={notes}
                                onChange={event => setNotes(event.target.value)}
                            />
                        </label>
                        <br />
                        <input type='submit' value='Submit changes' />
                    </form>
                    <button onClick={() => console.log('Under construction')}>Cancel changes</button>
                </>
                : <h2>This page can not be accessed directly.</h2>}
        </div>
    )
}

export default EditJournalEntry