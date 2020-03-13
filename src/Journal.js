// This component lists prints the books in the users journal.
import React, { useContext, useEffect } from 'react'
import { JournalContext } from './journalContext'
import JournalEntry from './JournalEntry'
import './Journal.css'

const Journal = props => {
    const { myBooks } = useContext(JournalContext) // myBooks contains bookId, bookTitle, bookThumbnail

    useEffect(() => {
        document.title = 'Journal'
    },[])

    return (
        <div>
            <p className='Journal-intro'>Books in your Journal</p>
            {myBooks.map(book => <JournalEntry book={book} key={book.bookId}/>)}
        </div>
    )
}

export default Journal