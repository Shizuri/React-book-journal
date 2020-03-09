// This component lists prints the books in the users journal.
import React, { useContext } from 'react'
import { JournalContext } from './journalContext'
import JournalEntry from './JournalEntry'

const Journal = props => {
    const { myBooks } = useContext(JournalContext) // myBooks contains bookId, bookTitle, bookThumbnail

    return (
        <div>
            <h1>Journal Component</h1>
            <button onClick={() => localStorage.setItem("books", [])}>Remove all books from Local Storage</button>
            <button onClick={() => console.log(localStorage.getItem("books"))}>Show localStorage</button> {/* eventually delete this line */}
            {myBooks.map(book => <JournalEntry book={book} key={book.bookId}/>)}
        </div>
    )
}

export default Journal