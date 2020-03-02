import React, { useContext } from 'react'
import { JournalContext } from './journalContext'

const Journal = () => {
    const { myBooks } = useContext(JournalContext)

    return (
        <div>
            <h1>Journal Component</h1>
            <button onClick={() => localStorage.setItem("books", [])}>Remove all books from Local Storage</button>
            {myBooks.map(book => <p key={book.bookId}>{book.bookTitle}</p>)}
        </div>
    )
}

export default Journal