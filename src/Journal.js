// This component lists prints the books in the users journal.
import React, { useContext, useEffect } from 'react'
import { JournalContext } from './journalContext'
import JournalEntry from './JournalEntry'

const Journal = props => {
    const { myBooks } = useContext(JournalContext) // myBooks contains bookId, bookTitle, bookThumbnail

    useEffect(() => {
        document.title = 'Journal'
    },[])

    return (
        <div>
            <h1>Journal Component</h1>
            {myBooks.map(book => <JournalEntry book={book} key={book.bookId}/>)}
        </div>
    )
}

export default Journal